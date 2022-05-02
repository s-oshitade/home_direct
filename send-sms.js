require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: process.env.PHONE_NUMBER,
  from: '+12892728425', //insert twilio number (purchased) here
  body: 'This is the ship that made the Kessel in 14 parsecs!'
})
.then((message) => console.log(message.sid))
//Then run node send-sms.js