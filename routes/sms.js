const express = require('express');
const MessagingResponse = require('twilio/lib/twiml/MessagingResponse');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const twiml = new MessagingResponse();

  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  });
  return router;
};
