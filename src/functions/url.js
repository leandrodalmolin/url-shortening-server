require('dotenv').config();
const serverless = require("serverless-http");
const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();

app.use(cors());
app.use(express.json());

// Prevents MongDB injection
// By default, $ and . characters are removed completely from user-supplied input
// in the following places: req.body, req.params, req.headers, req.query
// For more:
// - https://github.com/fiznool/express-mongo-sanitize#usage
// - https://javascript.plainenglish.io/how-to-sanitize-your-express-app-against-mongodb-injection-cross-site-scripting-6a22f4e822aa
app.use(mongoSanitize());

app.use('/url', routes);

// app.listen(process.env.PORT || 5000);

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};