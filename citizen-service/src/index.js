require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const citizenRoutes = require('./routes/citizenRoutes');

const app = express();
connectDB();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoRoute - Citizen Engagement & Rewards Service',
      version: '1.0.0',
      description: `
## Citizen Engagement & Rewards Microservice
**Member 3 | IT4020 Assignment 2 | SLIIT 2026**

This service focuses on the **User** side of the Smart City, encouraging responsible waste disposal through gamification.

### Key Features:
- Citizen registration and profile management
- **Eco-Points System**: Earn points for each recycling drop-off
  - Plastic: 50 pts/kg | Glass: 40 pts/kg | Metal: 60 pts/kg | Electronic: 100 pts/kg
- Tier system: Bronze → Silver → Gold based on total points
- Badge awards for special recycling achievements
- Rewards catalog with redeemable vouchers and discounts
- Full redemption history with voucher codes
      `,
      contact: { name: 'EcoRoute Team - SLIIT' }
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Direct Service' },
      { url: 'http://localhost:3000/api/citizen', description: 'Via API Gateway' }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'EcoRoute - Citizen Service API',
  customCss: '.swagger-ui .topbar { background-color: #e65100; } .swagger-ui .topbar-wrapper::after { content: "🏆 EcoRoute - Citizen Engagement & Rewards"; color: white; font-size: 1.2em; font-weight: bold; }'
}));

app.get('/health', (req, res) => {
  res.json({
    service: 'Citizen Engagement & Rewards Service',
    status: 'healthy',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

app.use('/', citizenRoutes);

app.get('/', (req, res) => {
  res.json({
    service: 'EcoRoute - Citizen Engagement & Rewards Service',
    version: '1.0.0',
    member: 'Member 3',
    docs: `http://localhost:${PORT}/api-docs`
  });
});

app.listen(PORT, () => {
  console.log(`\n🏆 Citizen Engagement & Rewards Service running on port ${PORT}`);
  console.log(`📖 Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`❤️  Health: http://localhost:${PORT}/health\n`);
});

module.exports = app;
