require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dispatchRoutes = require('./routes/dispatchRoutes');

const app = express();
connectDB();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoRoute - Logistics & Dispatch Optimization Service',
      version: '1.0.0',
      description: `
## Logistics & Dispatch Optimization Microservice
**Member 2 | IT4020 Assignment 2 | SLIIT 2026**

This service is the **Brain** of the EcoRoute operation, handling the complexity of waste collection logistics.

### Key Features:
- Fleet management with real-time truck availability tracking
- **Route Optimization**: Automatically assigns the nearest available truck using Euclidean distance calculation
- Collection task lifecycle management (assigned → in-progress → completed)
- Priority assignment (urgent for bins > 90%, high for bins > 80%)
- Integration with Bin Service for full-bin data
      `,
      contact: { name: 'EcoRoute Team - SLIIT' }
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Direct Service' },
      { url: 'http://localhost:3000/api/dispatch', description: 'Via API Gateway' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'EcoRoute - Dispatch Service API',
  customCss: '.swagger-ui .topbar { background-color: #1a237e; } .swagger-ui .topbar-wrapper::after { content: "🚛 EcoRoute - Dispatch & Logistics"; color: white; font-size: 1.2em; font-weight: bold; }'
}));

app.get('/health', (req, res) => {
  res.json({
    service: 'Logistics & Dispatch Optimization Service',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('/', dispatchRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'EcoRoute - Logistics & Dispatch Optimization Service',
    version: '1.0.0',
    member: 'Member 2',
    docs: `http://localhost:${PORT}/api-docs`,
    health: `http://localhost:${PORT}/health`
  });
});

app.listen(PORT, () => {
  console.log(`\n🚛 Logistics & Dispatch Service running on port ${PORT}`);
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
});

module.exports = app;
