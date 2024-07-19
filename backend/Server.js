// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Routes/Auth');
const PORT = 4500;
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.use('/', router);


// Start server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
