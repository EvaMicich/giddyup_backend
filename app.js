const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json('Hello from the giddyup server!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Giddyup is galloping on port ${port}`);
});
