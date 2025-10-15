# API Documentation - TQN Shop

## Base URL
```
http://localhost:3001/api
```

## Endpoints

### 1. Products API

#### GET /api/products
Lấy danh sách tất cả sản phẩm

**Query Parameters:**
- `category` (optional): Lọc theo category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Figure Naruto Uzumaki - Sage Mode",
      "slug": "figure-naruto-sage-mode",
      "price": 500000,
      "oldPrice": 600000,
      "image": "/img/figure1.svg",
      "images": [...],
      "category": "anime",
      "brand": "Bandai",
      "features": [...],
      "description": "...",
      "stock": 15,
      "rating": 4.8,
      "reviews": 156
    }
  ],
  "total": 2
}
```

**Example:**
```bash
# Lấy tất cả sản phẩm
GET http://localhost:3001/api/products

# Lấy sản phẩm theo category
GET http://localhost:3001/api/products?category=anime
```

---

#### GET /api/products/:id
Lấy chi tiết sản phẩm theo ID

**URL Parameters:**
- `id`: Product ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Figure Naruto Uzumaki - Sage Mode",
    "slug": "figure-naruto-sage-mode",
    "price": 500000,
    "oldPrice": 600000,
    "image": "/img/figure1.svg",
    "images": [...],
    "category": "anime",
    "brand": "Bandai",
    "features": [...],
    "description": "...",
    "stock": 15,
    "rating": 4.8,
    "reviews": 156
  }
}
```

**Example:**
```bash
GET http://localhost:3001/api/products/1
```

---

### 2. Categories API

#### GET /api/categories
Lấy danh sách tất cả categories

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Anime",
      "slug": "anime",
      "description": "Các sản phẩm figure anime"
    }
  ]
}
```

**Example:**
```bash
GET http://localhost:3001/api/categories
```

---

### 3. Orders API

#### POST /api/orders
Tạo đơn hàng mới

**Request Body:**
```json
{
  "userId": 1,  // optional
  "items": [
    {
      "productId": 1,
      "productName": "Figure Naruto Uzumaki - Sage Mode",
      "quantity": 2,
      "price": 500000
    }
  ],
  "total": 1000000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 1,
    "items": [...],
    "total": 1000000,
    "status": "pending",
    "createdAt": "2025-10-15T10:30:00.000Z"
  },
  "message": "Đặt hàng thành công"
}
```

**Example:**
```bash
POST http://localhost:3001/api/orders
Content-Type: application/json

{
  "items": [
    {
      "productId": 1,
      "productName": "Figure Naruto",
      "quantity": 1,
      "price": 500000
    }
  ],
  "total": 500000
}
```

---

## Error Responses

Tất cả endpoints đều trả về error response theo format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

---

## Database

Project sử dụng JSON file làm database tại: `/data/db.json`

**Structure:**
```json
{
  "products": [...],
  "categories": [...],
  "orders": [...],
  "users": [...]
}
```

---

## Test API với curl hoặc Postman

**Test Products:**
```bash
curl http://localhost:3001/api/products
curl http://localhost:3001/api/products/1
curl http://localhost:3001/api/products?category=anime
```

**Test Categories:**
```bash
curl http://localhost:3001/api/categories
```

**Test Orders:**
```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": 1,
        "productName": "Figure Naruto",
        "quantity": 1,
        "price": 500000
      }
    ],
    "total": 500000
  }'
```
