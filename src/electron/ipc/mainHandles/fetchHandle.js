import fetch from "cross-fetch";
import logger from "../../main/logger";

export default async function fetchHandle(
  _app,
  _browserWindow,
  event,
  url,
  options = {}
) {
  const method = options.method || "GET";
  const loglevel = options.loglevel || "debug";
  logger[loglevel](`Requesting '${method}' method on url '${url}'...`, {
    url,
    ...options,
  });
  const res = await fetch(url, options).catch((error) => {
    logger.error(`Error in ${method} request for ${url}: ${error}`, {
      url,
      options,
      error,
    });
    return {
      ok: false,
    };
  });
  const {
    headers: resHeaders,
    type,
    url: resUrl,
    ok,
    status,
    statusText,
    redirected,
  } = res;
  const headers = {};
  for (const header of resHeaders) {
    const [headerKey, headerValue] = header;
    headers[headerKey] = headerValue;
  }
  let body = null;
  try {
    body = await res.json();
  } catch (error) {}
  try {
    body = await res.text();
  } catch (error) {}
  return {
    requestParams: { url, options },
    headers,
    type,
    url: resUrl,
    ok,
    status,
    statusText,
    redirected,
    body,
  };
}
