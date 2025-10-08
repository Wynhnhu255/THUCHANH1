"use client";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function ProductPage() {
  const [mainImg, setMainImg] = useState("/img/figure1.svg");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // nothing for now — behaviors are inlined below
  }, []);

  function addToCart() {
    const product = { id: 1, name: "Figure Naruto Uzumaki - Sage Mode", price: 500000, image: mainImg, quantity: qty };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) existing.quantity += product.quantity;
    else cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm ${product.quantity} sản phẩm vào giỏ hàng!`);
  }

  return (
    <div>
      <main className="site-main">
        <div className="breadcrumb">
          <a href="/">Trang chủ</a> &gt; <a href="#">Anime</a> &gt; <span>Figure Naruto</span>
        </div>

        <section className="product-detail">
          <div className="product-images">
            <div className="main-image">
              <img id="mainImg" src={mainImg} alt="Figure Naruto" />
            </div>
            <div className="thumbnail-images">
              <img src="/img/figure1.svg" alt="t1" className={`thumb ${mainImg === "/img/figure1.svg" ? "active" : ""}`} onClick={() => setMainImg("/img/figure1.svg")} />
              <img src="/img/figure2.svg" alt="t2" className={`thumb ${mainImg === "/img/figure2.svg" ? "active" : ""}`} onClick={() => setMainImg("/img/figure2.svg")} />
              <img src="/logo.svg" alt="t3" className={`thumb ${mainImg === "/logo.svg" ? "active" : ""}`} onClick={() => setMainImg("/logo.svg")} />
            </div>
          </div>

          <div className="product-info">
            <h1>Figure Naruto Uzumaki - Sage Mode</h1>
            <div className="rating"><span className="stars">★★★★★</span> <span className="rating-text">(4.8/5 - 156 đánh giá)</span></div>
            <div className="price-section">
              <span className="current-price">500.000đ</span>
              <span className="old-price">600.000đ</span>
              <span className="discount">-17%</span>
            </div>

            <div className="product-features">
              <h3>Đặc điểm nổi bật:</h3>
              <ul>
                <li>✨ Chất liệu PVC cao cấp từ Nhật Bản</li>
                <li>🎨 Chi tiết tỉ mỉ, màu sắc sống động</li>
                <li>📏 Kích thước: 25cm (1/8 scale)</li>
                <li>🏆 Hàng chính hãng có tem bảo hành</li>
              </ul>
            </div>

            <div className="quantity-section">
              <label>Số lượng:</label>
              <div className="quantity-controls">
                <button className="qty-btn minus" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <input className="quantity-input" type="number" value={qty} min={1} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1")))} />
                <button className="qty-btn plus" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
              <span className="stock-info">Còn 15 sản phẩm</span>
            </div>

            <div className="action-buttons">
              <button className="add-to-cart" onClick={addToCart}>🛒 Thêm vào giỏ hàng</button>
              <button className="buy-now" onClick={() => { addToCart(); window.location.href = '/img/cart.html'; }}>⚡ Mua ngay</button>
              <button className="wishlist">💖 Yêu thích</button>
            </div>

            <div className="shipping-info">
              <h3>Thông tin vận chuyển:</h3>
              <p>🚚 Miễn phí ship đơn hàng &gt; 300.000đ</p>
              <p>⏰ Giao hàng trong 1-2 ngày tại TP.HCM</p>
              <p>☎ Hỗ trợ 24/7: 0123.456.789</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
