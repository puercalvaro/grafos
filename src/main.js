const express = require('express');
let port = process.env.PORT || 3000;

const app = express();

app.use('/', express.static('public'));

const customerRouter = require('../src/index')

app.use('/', customerRouter)


app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);