require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const ewasteRoutes = require('./routes/ewasteRoutes');

const app = express();
connectDB();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoRoute - Hazardous & E-Waste Tracker Service',
      version: '1.0.0',
      description: `
## Hazardous & Electronic Waste Tracker Microservice
**Member 4 | IT4020 Assignment 2 | SLIIT 2026**

A specialized service handling the complete lifecycle of dangerous materials including batteries, chemicals, and medical waste.

### Key Features:
- Full lifecycle tracking: logged → in-transit → received → processing → processed → disposed
- **Auto-Routing Engine**: Automatically assigns items to the correct specialized processing center based on waste type
- **Immutable Audit Log**: Every status change is permanently recorded for environmental compliance
- Basel Convention compliance tracking
- Environmental impact reporting (CO2 savings, toxic materials diverted from landfill)
- Covers: Electronic, Battery, Chemical, Medical, Pharmaceutical, Industrial waste
      `,
      contact: { name: 'EcoRoute Team - SLIIT' }
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Direct Service' },
      { url: 'http://localhost:3000/api/ewaste', description: 'Via API Gateway' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'EcoRoute - E-Waste Service API',
  customCss: '.swagger-ui .topbar { background-color: #880e4f; } .swagger-ui .topbar-wrapper::after { content: "☢️ EcoRoute - Hazardous & E-Waste Tracker"; color: white; font-size: 1.2em; font-weight: bold; }'
}));

app.get('/health', (req, res) => {
  res.json({
    service: 'Hazardous & E-Waste Tracker Service',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.use('/', ewasteRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'EcoRoute - Hazardous & E-Waste Tracker Service',
    version: '1.0.0',
    member: 'Member 4',
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.listen(PORT, () => {
  console.log(`\n☢️  Hazardous & E-Waste Tracker Service running on port ${PORT}`);
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
});

module.exports = app;
