const express = require('express');
const cors = require('./cors.js');
const port = 3002;
const app = express();
app.use(express.json());
app.use(cors);
app.post('/', (req, res) => {
  res.json(req.body);
});
app.listen(port);
console.log(`listening port ${port}`);
