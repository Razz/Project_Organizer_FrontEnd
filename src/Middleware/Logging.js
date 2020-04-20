import React from 'react';
import { Logger } from 'splunk-logging';

export const logger = new Logger({
  url: 'http://localhost',
  port: process.env.REACT_APP_PORT,
  path: '/logging',
  token: process.env.REACT_APP_SPLUNK_HTTP_TOKEN
});

logger.__proto__.log = function(message) {
  var url = `${this.config.protocol}://${this.config.host}:${this.config.port}/${this.config.path}`
  console.log(message);
  console.log("Sending to Splunk at this URL: " + url)
  var payload = {
    message: message
  }
  this.send(payload, function(err, resp, body) {
    console.log(`Splunk says: [${body.code}] ${body.text}`);
  });
}
