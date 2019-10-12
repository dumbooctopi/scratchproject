const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// require in router

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// flow message
app.use((req, res, next) => {
  console.log(`METHOD: ${req.method}, PATH: ${req.url}, BODY: ${JSON.stringify(req.body)}`);
  return next();
});


// add routers here:


// test
app.use('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, './../index.html'));
});

// standard bad endpoint, send 404
app.use('*', (req, res) => {
  console.log('undefined endpoint, 404 error sent to use');
  res.status(404).send('This endpoint has not been built, try again punk');
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultError = {
    status: 500,
    message: 'Default Error from the Global Error Handler',
  };

  console.log('global error handler triggered');
  const assignError = { ...defaultError, ...err };

  // send the response
  res.status(assignError.status).send(assignError.message);
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
