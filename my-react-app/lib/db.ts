import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  image: string;
  images: string[];
  category: string;
  brand: string;
  features: string[];
  description: string;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type Order = {
  id: number;
  userId?: number;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
};

export type Database = {
  products: Product[];
  categories: Category[];
  orders: Order[];
  users: any[];
};

// Đọc database
export function readDB(): Database {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return {
      products: [],
      categories: [],
      orders: [],
      users: []
    };
  }
}

// Ghi database
export function writeDB(data: Database): boolean {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
}

// Lấy tất cả sản phẩm
export function getAllProducts(): Product[] {
  const db = readDB();
  return db.products;
}

// Lấy sản phẩm theo ID
export function getProductById(id: number): Product | undefined {
  const db = readDB();
  return db.products.find(p => p.id === id);
}

// Lấy sản phẩm theo category
export function getProductsByCategory(category: string): Product[] {
  const db = readDB();
  return db.products.filter(p => p.category === category);
}

// Thêm đơn hàng
export function addOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
  const db = readDB();
  const newOrder: Order = {
    ...order,
    id: db.orders.length > 0 ? Math.max(...db.orders.map(o => o.id)) + 1 : 1,
    createdAt: new Date().toISOString()
  };
  db.orders.push(newOrder);
  writeDB(db);
  return newOrder;
}

// Lấy tất cả categories
export function getAllCategories(): Category[] {
  const db = readDB();
  return db.categories;
}
