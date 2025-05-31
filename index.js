const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());