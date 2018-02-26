#!/bin/env node
var express = require('express');

const PORT = process.env.PORT || 80;
const app = express();

// Seting static files path
app.use('/', express.static(__dirname));

app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`La API aŭskultas ĉe la pordo ${PORT}`);
  console.log('Presu Ctrl+C por ĉesi.');
});
