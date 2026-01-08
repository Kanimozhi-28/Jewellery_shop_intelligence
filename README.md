# Jewellery Retail Intelligence PoC - Setup Guide

This guide explains how to run the complete privacy-first intelligence system.

## 1. Prerequisites
- Docker & Docker Compose
- Node.js & npm (for local frontend development)
- Python 3.11 (for local backend development)

## 2. Infrastructure Setup
To start the database, cache, and object storage:
```bash
docker-compose up -d
```

## 3. Backend Setup
1. **Initialize Environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
2. **Seed the Database:**
   ```bash
   python seed.py
   ```
3. **Run API:**
   ```bash
   uvicorn app.main:app --reload
   ```

## 4. Salesperson Web App
1. **Setup:**
   ```bash
   cd salesperson-app
   npm install
   ```
2. **Run:**
   ```bash
   npm run dev
   ```
   Explore the flow: Login -> Select Gold Zone -> Assist Customer.

## 5. Admin Dashboard
1. **Setup:**
   ```bash
   cd admin-dashboard
   npm install
   ```
2. **Run:**
   ```bash
   npm run dev
   ```
   View high-level conversion analytics and traffic trends.

## 6. Testing the "Loop Closure"
To simulate a POS purchase being matched to a showroom interaction:
1. Start a session in the Salesperson App for `CUST-101` and scan item `JWL001`.
2. Send a mock purchase webhook:
   ```bash
   curl -X POST http://localhost:8000/api/webhooks/pos/purchase \
   -H "Content-Type: application/json" \
   -d '{
     "jewellery_barcode": "JWL001",
     "purchase_amount": 45000.0,
     "pos_transaction_id": "TRANS-999"
   }'
   ```
3. Check the Admin Dashboard to see the conversion update.
