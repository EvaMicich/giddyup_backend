const express = require('express');

const app = express();

app.get('/', (req, res) => {
  req.status(200).send("Hello from the giddyup server!");
});