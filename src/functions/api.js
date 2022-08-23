require('dotenv').config();
const serverless = require("serverless-http");
const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(`/.netlify/functions/api`, routes);

// app.listen(process.env.PORT || 5000);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};