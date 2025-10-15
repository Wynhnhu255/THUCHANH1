"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  oldPrice?: number;
};

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <main className="site-main">
          <section className="product-list">
            <h2>Đang tải...</h2>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main className="site-main">
        <section className="product-list">
          <h2>Sản phẩm nổi bật</h2>
          <div className="products">
            {products.map(p => (
              <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p className="price">{p.price.toLocaleString('vi-VN')}đ {p.oldPrice ? <span className="old-price">{p.oldPrice.toLocaleString('vi-VN')}đ</span> : null}</p>
                <div className="card-buttons">
                  <button className="btn detail-btn" onClick={() => router.push(`/product/${p.id}`)}>Xem chi tiết</button>
                  <button className="btn add-cart-btn" onClick={() => {
                    const product = { id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 };
                    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                    const existing = cart.find((i: any) => i.id === product.id);
                    if (existing) existing.quantity += 1; else cart.push(product);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
                  }}>🛒 Thêm vào giỏ</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

