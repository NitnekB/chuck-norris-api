const express = require('express');
const app = express();

const withAuth = require('./services/authenticate');
const publishRandomFacts = require('./handlers/chuck-norris');

// Heroku provides its own PORT environment variable
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Content-Type",'application/json');
  next();
});

app.get('/chuck-norris', withAuth, (req, res) => {
  publishRandomFacts(res);
});

app.listen(PORT, () => {
  console.log(`Chuck Norris is listening on port: ${PORT}!`);
});
