"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

const products = [
  { id: 1, name: "Figure Naruto", price: 500000, image: "/img/figure1.svg", oldPrice: 600000 },
  { id: 2, name: "Figure Luffy", price: 450000, image: "/img/figure2.svg" }
];

export default function Home() {
  const router = useRouter();

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

