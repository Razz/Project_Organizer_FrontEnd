import React from 'react';
import { Logger } from 'splunk-logging';

export const logger = new Logger({
  url: 'http://localhost',
  port: process.env.REACT_APP_PORT,
  path: '/logging',
  token: process.env.REACT_APP_SPLUNK_HTTP_TOKEN
});

logger.__proto__.log = function(message, severity) {
  var url = `${this.config.protocol}://${this.config.host}:${this.config.port}/${this.config.path}`
  if (!severity) {
    var sev = 'info'
  }
  else if (severity != "info" && severity != "debug" && severity != "warn" && severity != "error") {
    console.log(`Invalid log level detected; dropping down to info: ${severity}`)
    var sev = 'info'
  }
  else {
    var sev = severity
  }
  console.log(message);
  console.log("Sending to Splunk at this URL: " + url)
  var payload = {
    message: message,
    severity: sev
  }
  this.send(payload, function(err, resp, body) {
    console.log(`Splunk says: [${body.code}] ${body.text}`);
  });
}

logger.__proto__.info = function(message) {
  this.log(message, 'info')
}

logger.__proto__.error = function(message) {
  this.log(message, 'error')
}

logger.__proto__.warn = function(message) {
  this.log(message, 'warn')
}

logger.__proto__.debug = function(message) {
  this.log(message, 'debug')
}
