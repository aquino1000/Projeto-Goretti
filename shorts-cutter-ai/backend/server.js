require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const processRoutes = require('./routes/processRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use('/api', processRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Shorts Cutter AI rodando em http://localhost:${PORT}`);
});
