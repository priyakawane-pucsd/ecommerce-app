const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const logger = require('./utils/logger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api', require('./routes/user.routes'));
app.use('/api', require('./routes/product.routes'));

// Setup Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });