require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const binRoutes = require('./routes/binRoutes');

const app = express();
connectDB();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoRoute - Smart Bin Management Service',
      version: '1.0.0',
      description: `
## Smart Bin Management Microservice
**Member 1 | IT4020 Assignment 2 | SLIIT 2026**

This service acts as the **Digital Twin** for the physical waste bin infrastructure.

### Key Features:
- Register and manage smart waste bins with GPS coordinates
- Real-time fill-level monitoring via IoT sensor simulation
- **Threshold Trigger Logic**: Automatically emits dispatch alerts when a bin reaches 80% capacity
- Zone-based bin management for organized collection routes
- Full audit trail of threshold notifications
      `,
      contact: {
        name: 'EcoRoute Team - SLIIT',
        email: 'ecoroute@sliit.lk'
      }
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Direct Service' },
      { url: 'http://localhost:3000/api/bins', description: 'Via API Gateway' }
    ],
    components: {
      schemas: {
        Bin: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'bin-001' },
            name: { type: 'string', example: 'Bin Alpha - Main Street' },
            location: {
              type: 'object',
              properties: {
                lat: { type: 'number', example: 6.9271 },
                lng: { type: 'number', example: 79.8612 },
                address: { type: 'string', example: '45 Main Street, Colombo 01' }
              }
            },
            type: { type: 'string', enum: ['general', 'recyclable', 'organic'], example: 'general' },
            capacity_liters: { type: 'number', example: 240 },
            fill_level: { type: 'number', minimum: 0, maximum: 100, example: 85 },
            status: { type: 'string', enum: ['active', 'full', 'empty'], example: 'full' },
            last_updated: { type: 'string', format: 'date-time' },
            sensor_id: { type: 'string', example: 'SENS-001' },
            zone: { type: 'string', example: 'Zone-A' }
          }
        },
        CreateBinRequest: {
          type: 'object',
          required: ['name', 'location', 'type', 'zone'],
          properties: {
            name: { type: 'string', example: 'Bin Echo - New Location' },
            location: {
              type: 'object',
              properties: {
                lat: { type: 'number', example: 6.9500 },
                lng: { type: 'number', example: 79.8700 },
                address: { type: 'string', example: '100 New Road, Colombo 05' }
              }
            },
            type: { type: 'string', enum: ['general', 'recyclable', 'organic'], example: 'recyclable' },
            capacity_liters: { type: 'number', example: 240 },
            sensor_id: { type: 'string', example: 'SENS-005' },
            zone: { type: 'string', example: 'Zone-B' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'EcoRoute - Bin Service API',
  customCss: '.swagger-ui .topbar { background-color: #1b5e20; } .swagger-ui .topbar-wrapper img { content: none; } .swagger-ui .topbar-wrapper::after { content: "🗑️ EcoRoute - Smart Bin Management"; color: white; font-size: 1.2em; font-weight: bold; }'
}));

// Health check
app.get('/health', (req, res) => {
  res.json({
    service: 'Smart Bin Management Service',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes
app.use('/bins', binRoutes);

// Root
app.get('/', (req, res) => {
  res.json({
    service: 'EcoRoute - Smart Bin Management Service',
    version: '1.0.0',
    member: 'Member 1',
    docs: `http://localhost:${PORT}/api-docs`,
    health: `http://localhost:${PORT}/health`
  });
});

app.listen(PORT, () => {
  console.log(`\n🗑️  Smart Bin Management Service running on port ${PORT}`);
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
});

module.exports = app;
