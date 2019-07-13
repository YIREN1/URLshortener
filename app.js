'use strict';

const express = require('express');
const connectDB = require('./config/db');

connectDB();

// Constants
const PORT = process.env.PORT || 8080;
const HOST = process.env.PORT || '0.0.0.0';

// App
const app = express();

app.use(express.json({ extented: false }));

app.get('/', (req, res) => {
  res.send('Hello worlddddd\n');
});

app.use('/', require('./api/v1/index'));
app.use('/api/v1/url', require('./api/v1/url'));

app.listen(PORT, HOST, () => console.log(`\u001b[1;31m Running on http://${HOST}:${PORT}`));
