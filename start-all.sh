#!/bin/bash
# ============================================================
# EcoRoute - Start All Microservices
# IT4020 Assignment 2 | SLIIT 2026
# ============================================================

echo ""
echo "🌿 ============================================="
echo "   EcoRoute Smart Waste Management System"
echo "   IT4020 Assignment 2 | SLIIT 2026"
echo "🌿 ============================================="
echo ""

# Install all dependencies first
echo "📦 Installing all dependencies..."
cd bin-service && npm install --silent && cd ..
cd dispatch-service && npm install --silent && cd ..
cd citizen-service && npm install --silent && cd ..
cd ewaste-service && npm install --silent && cd ..
cd api-gateway && npm install --silent && cd ..
echo "✅ All dependencies installed!"
echo ""

echo "🚀 Starting all microservices..."
echo ""

# Start each service in background
echo "▶  Starting Bin Service (port 3001)..."
cd bin-service && npm start &
BIN_PID=$!
cd ..
sleep 1

echo "▶  Starting Dispatch Service (port 3002)..."
cd dispatch-service && npm start &
DISPATCH_PID=$!
cd ..
sleep 1

echo "▶  Starting Citizen Service (port 3003)..."
cd citizen-service && npm start &
CITIZEN_PID=$!
cd ..
sleep 1

echo "▶  Starting E-Waste Service (port 3004)..."
cd ewaste-service && npm start &
EWASTE_PID=$!
cd ..
sleep 1

echo "▶  Starting API Gateway (port 3000)..."
cd api-gateway && npm start &
GATEWAY_PID=$!
cd ..
sleep 2

echo ""
echo "✅ ============================================="
echo "   All services are running!"
echo "============================================="
echo ""
echo "🔗 Access Points:"
echo "   API Gateway:    http://localhost:3000"
echo "   Gateway Docs:   http://localhost:3000/api-docs"
echo "   Health Check:   http://localhost:3000/health"
echo ""
echo "📖 Swagger Docs (Direct):"
echo "   Bin Service:     http://localhost:3001/api-docs"
echo "   Dispatch:        http://localhost:3002/api-docs"
echo "   Citizen:         http://localhost:3003/api-docs"
echo "   E-Waste:         http://localhost:3004/api-docs"
echo ""
echo "📖 Swagger Docs (Via Gateway):"
echo "   Bin Service:     http://localhost:3000/bin/api-docs"
echo "   Dispatch:        http://localhost:3000/dispatch/api-docs"
echo "   Citizen:         http://localhost:3000/citizen/api-docs"
echo "   E-Waste:         http://localhost:3000/ewaste/api-docs"
echo "============================================="
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait and handle cleanup
trap "echo ''; echo 'Stopping all services...'; kill $BIN_PID $DISPATCH_PID $CITIZEN_PID $EWASTE_PID $GATEWAY_PID 2>/dev/null; echo 'All services stopped.'; exit 0" INT

wait
