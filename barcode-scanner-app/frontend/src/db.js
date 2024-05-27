const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/BARCODE-SCANNER-APP';

// Configuración y conexión a MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Manejo de eventos de conexión
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

module.exports = db;

