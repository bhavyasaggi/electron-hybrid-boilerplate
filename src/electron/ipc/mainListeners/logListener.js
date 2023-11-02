import logger from "../../main/logger";

export default function logListener(
  _app,
  _browserWindow,
  event,
  type = "silly",
  message = "",
  attributes = {}
) {
  logger[type](message, attributes);
}
