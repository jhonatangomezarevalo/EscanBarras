const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
