const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/barcodes', { useNewUrlParser: true, useUnifiedTopology: true });

const barcodeSchema = new mongoose.Schema({
  code: String,
  description: String
});

const Barcode = mongoose.model('Barcode', barcodeSchema);

app.post('/scan', async (req, res) => {
  const { code } = req.body;
  let barcode = await Barcode.findOne({ code });
  if (!barcode) {
    barcode = new Barcode({ code, description: 'Descripción del código' });
    await barcode.save();
  }
  res.json(barcode);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});