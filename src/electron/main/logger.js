import os from "os";
import qs from "query-string";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { createLogger, format, transports } from "winston";

import { persistentStore } from "./store";

import isDev from "../../utils/isDev";

const { combine, timestamp, json, printf } = format;

const DATADOG_API_KEY = process.env.DATADOG_API_KEY;
const PROJECT_ENV = process.env.NODE_ENV;
const PLATFORM = process.platform;
const HOSTNAME = os.hostname();

const validLoggingTypes = [
  "info",
  "error",
  "debug",
  "warn",
  "verbose",
  "silly",
];

function getPrintFormat() {
  return printf((info) => {
    const { level, message, timestamp } = info;
    delete info.level;
    delete info.message;
    delete info.timestamp;
    return `\n${timestamp} | ${level} | ${message} | ${JSON.stringify(
      info,
      null,
      2
    )}`;
  });
}

const getDataDogPath = () => {
  const service = "client";
  const project = "screen_recording";
  const source = "nodejs";
  const { tenant } = persistentStore.store;
  qs.stringifyUrl({
    url: `/api/v2/logs`,
    query: {
      "dd-api-key": DATADOG_API_KEY,
      ddsource: source,
      ddtags: `projectenv:${PROJECT_ENV}`,
      service,
      project,
      hostname: HOSTNAME,
      platform: PLATFORM,
      tenantId: tenant || "N/A",
    },
  });
};

const getMetaDataAttributes = () => {
  const { tenant, name, email, agentId, extEmpId } = persistentStore.store;
  return omitBy({ tenant, name, email, agentId, extEmpId }, isNil);
};

const consoleTransport = new transports.Console({ level: "silly" });
const httpTransport = new transports.Http({
  host: "http-intake.logs.datadoghq.com",
  path: getDataDogPath(),
  ssl: true,
  level: "silly",
});

// LoggerOptions based on environment
const loggerOptions = isDev
  ? {
      format: combine(format.colorize(), timestamp(), getPrintFormat()),
      transports: [consoleTransport],
    }
  : {
      exitOnError: false,
      format: combine(timestamp(), json()),
      transports: [httpTransport],
      exceptionHandlers: [consoleTransport, httpTransport],
      rejectionHandlers: [consoleTransport, httpTransport],
    };

// Winston Logger
const winstonLogger = createLogger(loggerOptions);

const loggerTemplate = validLoggingTypes.reduce((template, type) => {
  template[type] = {
    value: function (message = "", attributes = {}) {
      httpTransport.path = getDataDogPath();
      const metadata = getMetaDataAttributes();
      return winstonLogger[type](message, { ...attributes, ...metadata });
    },
  };
  return template;
}, {});

const logger = Object.freeze(Object.defineProperties({}, loggerTemplate));

export default logger;
