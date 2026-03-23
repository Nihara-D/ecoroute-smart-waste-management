const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;

// Service registry - all microservice URLs
const SERVICES = {
  BIN:      { url: 'http://localhost:3001', prefix: '/api/bins',     name: 'Smart Bin Management',           member: 'Member 1', color: '#1b5e20' },
  DISPATCH: { url: 'http://localhost:3002', prefix: '/api/dispatch', name: 'Logistics & Dispatch',           member: 'Member 2', color: '#1a237e' },
  CITIZEN:  { url: 'http://localhost:3003', prefix: '/api/citizen',  name: 'Citizen Engagement & Rewards',   member: 'Member 3', color: '#e65100' },
  EWASTE:   { url: 'http://localhost:3004', prefix: '/api/ewaste',   name: 'Hazardous & E-Waste Tracker',    member: 'Member 4', color: '#880e4f' }
};

// ──────────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────────
app.use(cors());
app.use(morgan('combined'));

// Rate limiting - Gateway-level protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Request logging middleware
app.use((req, res, next) => {
  req.gatewayTimestamp = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req.gatewayTimestamp;
    console.log(`[GATEWAY] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ──────────────────────────────────────────────
// Swagger "Aggregator" UI for the Gateway itself
// ──────────────────────────────────────────────
const gatewaySwaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'EcoRoute - API Gateway',
    version: '1.0.0',
    description: `
# EcoRoute Smart Waste Management System
## API Gateway — Unified Entry Point
**IT4020 Assignment 2 | SLIIT | Year 4 Semester 1/2 2026**

---

The **API Gateway** is the single entry point for all EcoRoute microservices. It eliminates the need for clients to know individual service ports, providing:

- ✅ **Single Port Access** — All services accessed via port 3000
- ✅ **Request Routing** — Automatically routes to the correct microservice
- ✅ **Rate Limiting** — 200 requests per 15 minutes per client
- ✅ **CORS Management** — Cross-origin requests handled centrally
- ✅ **Request Logging** — All requests logged with response time
- ✅ **Health Aggregation** — Single endpoint checks all services

## Service Routing Table

| Prefix | Service | Port | Member |
|--------|---------|------|--------|
| \`/api/bins/*\` | Smart Bin Management | 3001 | Member 1 |
| \`/api/dispatch/*\` | Logistics & Dispatch | 3002 | Member 2 |
| \`/api/citizen/*\` | Citizen Engagement & Rewards | 3003 | Member 3 |
| \`/api/ewaste/*\` | Hazardous & E-Waste Tracker | 3004 | Member 4 |

## Individual Service Swagger Docs (via Gateway)
- Bin Service: [/bin/api-docs](/bin/api-docs)
- Dispatch Service: [/dispatch/api-docs](/dispatch/api-docs)
- Citizen Service: [/citizen/api-docs](/citizen/api-docs)
- E-Waste Service: [/ewaste/api-docs](/ewaste/api-docs)
    `,
    contact: { name: 'EcoRoute Team - SLIIT IT4020', email: 'ecoroute@sliit.lk' }
  },
  servers: [{ url: `http://localhost:${PORT}`, description: 'API Gateway (All Services)' }],
  paths: {
    '/health': {
      get: {
        tags: ['Gateway'],
        summary: 'Gateway health + all service health check',
        responses: { 200: { description: 'Health status of gateway and all microservices' } }
      }
    },
    '/services': {
      get: {
        tags: ['Gateway'],
        summary: 'List all registered microservices',
        responses: { 200: { description: 'Service registry' } }
      }
    },
    '/api/bins/bins': {
      get: { tags: ['→ Bin Service'], summary: 'Proxied: GET all bins', responses: { 200: { description: 'Proxied to Bin Service' } } },
      post: { tags: ['→ Bin Service'], summary: 'Proxied: Register new bin', responses: { 201: { description: 'Proxied to Bin Service' } } }
    },
    '/api/bins/bins/{id}/update-level': {
      post: {
        tags: ['→ Bin Service'],
        summary: 'Proxied: Update bin fill level',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Proxied to Bin Service' } }
      }
    },
    '/api/bins/bins/status/full': {
      get: { tags: ['→ Bin Service'], summary: 'Proxied: Get full bins', responses: { 200: { description: 'Proxied to Bin Service' } } }
    },
    '/api/dispatch/tasks/active': {
      get: { tags: ['→ Dispatch Service'], summary: 'Proxied: Get active tasks', responses: { 200: { description: 'Proxied to Dispatch Service' } } }
    },
    '/api/dispatch/dispatch/assign': {
      post: { tags: ['→ Dispatch Service'], summary: 'Proxied: Assign dispatch task', responses: { 201: { description: 'Proxied to Dispatch Service' } } }
    },
    '/api/dispatch/tasks/{id}/complete': {
      put: {
        tags: ['→ Dispatch Service'],
        summary: 'Proxied: Complete a task',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Proxied to Dispatch Service' } }
      }
    },
    '/api/citizen/profile/{id}': {
      get: {
        tags: ['→ Citizen Service'],
        summary: 'Proxied: Get citizen profile',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' }, example: 'cit-001' }],
        responses: { 200: { description: 'Proxied to Citizen Service' } }
      }
    },
    '/api/citizen/points/add': {
      post: { tags: ['→ Citizen Service'], summary: 'Proxied: Add eco points', responses: { 200: { description: 'Proxied to Citizen Service' } } }
    },
    '/api/citizen/rewards/redeem': {
      post: { tags: ['→ Citizen Service'], summary: 'Proxied: Redeem reward', responses: { 200: { description: 'Proxied to Citizen Service' } } }
    },
    '/api/ewaste/ewaste/log': {
      post: { tags: ['→ E-Waste Service'], summary: 'Proxied: Log e-waste item', responses: { 201: { description: 'Proxied to E-Waste Service' } } }
    },
    '/api/ewaste/ewaste/centers': {
      get: { tags: ['→ E-Waste Service'], summary: 'Proxied: Get processing centers', responses: { 200: { description: 'Proxied to E-Waste Service' } } }
    },
    '/api/ewaste/ewaste/reports': {
      get: { tags: ['→ E-Waste Service'], summary: 'Proxied: Get compliance report', responses: { 200: { description: 'Proxied to E-Waste Service' } } }
    },
    '/api/ewaste/ewaste/audit-log': {
      get: { tags: ['→ E-Waste Service'], summary: 'Proxied: Get audit log', responses: { 200: { description: 'Proxied to E-Waste Service' } } }
    }
  },
  tags: [
    { name: 'Gateway', description: 'API Gateway management endpoints' },
    { name: '→ Bin Service', description: 'Proxied to Smart Bin Management (port 3001)' },
    { name: '→ Dispatch Service', description: 'Proxied to Logistics & Dispatch (port 3002)' },
    { name: '→ Citizen Service', description: 'Proxied to Citizen Engagement & Rewards (port 3003)' },
    { name: '→ E-Waste Service', description: 'Proxied to Hazardous & E-Waste Tracker (port 3004)' }
  ]
};

// Gateway Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(gatewaySwaggerSpec, {
  customSiteTitle: 'EcoRoute - API Gateway',
  customCss: `
    .swagger-ui .topbar { background: linear-gradient(135deg, #1b5e20 0%, #1a237e 33%, #e65100 66%, #880e4f 100%); }
    .swagger-ui .topbar-wrapper::after { content: "🌿 EcoRoute - API Gateway | IT4020 SLIIT 2026"; color: white; font-size: 1.1em; font-weight: bold; }
    .swagger-ui .topbar-wrapper img { display: none; }
  `
}));

// ──────────────────────────────────────────────
// Proxy Swagger UIs per service (accessible through gateway)
// ──────────────────────────────────────────────
app.use('/bin/api-docs', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true, pathRewrite: { '^/bin': '' } }));
app.use('/dispatch/api-docs', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true, pathRewrite: { '^/dispatch': '' } }));
app.use('/citizen/api-docs', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true, pathRewrite: { '^/citizen': '' } }));
app.use('/ewaste/api-docs', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true, pathRewrite: { '^/ewaste': '' } }));

// ──────────────────────────────────────────────
// Proxy Routes — Core routing logic
// ──────────────────────────────────────────────

// Bin Service: /api/bins/* → http://localhost:3001/*
app.use('/api/bins', createProxyMiddleware({
  target: SERVICES.BIN.url,
  changeOrigin: true,
  pathRewrite: { '^/api/bins': '' },
  on: {
    error: (err, req, res) => {
      res.status(502).json({ success: false, message: 'Bin Service unavailable', error: err.message });
    }
  }
}));

// Dispatch Service: /api/dispatch/* → http://localhost:3002/*
app.use('/api/dispatch', createProxyMiddleware({
  target: SERVICES.DISPATCH.url,
  changeOrigin: true,
  pathRewrite: { '^/api/dispatch': '' },
  on: {
    error: (err, req, res) => {
      res.status(502).json({ success: false, message: 'Dispatch Service unavailable', error: err.message });
    }
  }
}));

// Citizen Service: /api/citizen/* → http://localhost:3003/*
app.use('/api/citizen', createProxyMiddleware({
  target: SERVICES.CITIZEN.url,
  changeOrigin: true,
  pathRewrite: { '^/api/citizen': '' },
  on: {
    error: (err, req, res) => {
      res.status(502).json({ success: false, message: 'Citizen Service unavailable', error: err.message });
    }
  }
}));

// E-Waste Service: /api/ewaste/* → http://localhost:3004/*
app.use('/api/ewaste', createProxyMiddleware({
  target: SERVICES.EWASTE.url,
  changeOrigin: true,
  pathRewrite: { '^/api/ewaste': '' },
  on: {
    error: (err, req, res) => {
      res.status(502).json({ success: false, message: 'E-Waste Service unavailable', error: err.message });
    }
  }
}));

// ──────────────────────────────────────────────
// Gateway-native endpoints
// ──────────────────────────────────────────────

// Service registry
app.get('/services', (req, res) => {
  res.json({
    success: true,
    gateway: `http://localhost:${PORT}`,
    services: Object.entries(SERVICES).map(([key, svc]) => ({
      key,
      name: svc.name,
      member: svc.member,
      direct_url: svc.url,
      gateway_prefix: `http://localhost:${PORT}${svc.prefix}`,
      swagger_via_gateway: `http://localhost:${PORT}/${key.toLowerCase()}/api-docs`,
      swagger_direct: `${svc.url}/api-docs`
    }))
  });
});

// Aggregated health check
app.get('/health', async (req, res) => {
  const http = require('http');

  const checkService = (name, url) => new Promise((resolve) => {
    const start = Date.now();
    http.get(`${url}/health`, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        resolve({ name, status: 'healthy', response_time_ms: Date.now() - start, url });
      });
    }).on('error', () => {
      resolve({ name, status: 'unreachable', response_time_ms: Date.now() - start, url });
    });
  });

  const checks = await Promise.all([
    checkService('Smart Bin Management', SERVICES.BIN.url),
    checkService('Logistics & Dispatch', SERVICES.DISPATCH.url),
    checkService('Citizen Engagement & Rewards', SERVICES.CITIZEN.url),
    checkService('Hazardous & E-Waste Tracker', SERVICES.EWASTE.url)
  ]);

  const allHealthy = checks.every(c => c.status === 'healthy');
  res.status(allHealthy ? 200 : 207).json({
    gateway: 'healthy',
    overall_status: allHealthy ? 'all_services_online' : 'some_services_unavailable',
    timestamp: new Date().toISOString(),
    services: checks
  });
});

// Root landing page
app.get('/', (req, res) => {
  res.json({
    project: '🌿 EcoRoute - Smart Waste Management System',
    module: 'IT4020 Assignment 2 | SLIIT | Year 4 Sem 1/2 2026',
    gateway_port: PORT,
    gateway_swagger: `http://localhost:${PORT}/api-docs`,
    health_check: `http://localhost:${PORT}/health`,
    service_registry: `http://localhost:${PORT}/services`,
    services: {
      'Smart Bin Management (Member 1)': {
        via_gateway: `http://localhost:${PORT}/api/bins`,
        swagger_via_gateway: `http://localhost:${PORT}/bin/api-docs`
      },
      'Logistics & Dispatch (Member 2)': {
        via_gateway: `http://localhost:${PORT}/api/dispatch`,
        swagger_via_gateway: `http://localhost:${PORT}/dispatch/api-docs`
      },
      'Citizen Engagement & Rewards (Member 3)': {
        via_gateway: `http://localhost:${PORT}/api/citizen`,
        swagger_via_gateway: `http://localhost:${PORT}/citizen/api-docs`
      },
      'Hazardous & E-Waste Tracker (Member 4)': {
        via_gateway: `http://localhost:${PORT}/api/ewaste`,
        swagger_via_gateway: `http://localhost:${PORT}/ewaste/api-docs`
      }
    }
  });
});

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🌿  EcoRoute API GATEWAY');
  console.log('='.repeat(60));
  console.log(`🚀  Gateway running at:   http://localhost:${PORT}`);
  console.log(`📖  Gateway Swagger:       http://localhost:${PORT}/api-docs`);
  console.log(`❤️   Health check:          http://localhost:${PORT}/health`);
  console.log(`📋  Service registry:      http://localhost:${PORT}/services`);
  console.log('─'.repeat(60));
  console.log('📡  Routing table:');
  console.log(`  /api/bins      → Bin Service      (port 3001)`);
  console.log(`  /api/dispatch  → Dispatch Service  (port 3002)`);
  console.log(`  /api/citizen   → Citizen Service   (port 3003)`);
  console.log(`  /api/ewaste    → E-Waste Service   (port 3004)`);
  console.log('='.repeat(60) + '\n');
});

module.exports = app;
