"use client";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function update() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCount(cart.reduce((s: number, i: any) => s + (i.quantity || 0), 0));
    }
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  return (
    <header>
      <div className="logo">
        <a href="/">
          <img src="/img/logo.jpg" alt="Logo TQN Shop" />
        </a>
        <div className="shop-name">TQN Shop</div>
      </div>
      <nav>
        <ul>
          <li><a href="/">Trang chủ</a></li>
          <li><a href="/cart">Giỏ hàng{count > 0 ? ` (${count})` : ''}</a></li>
          <li><a href="#">Đăng nhập</a></li>
        </ul>
      </nav>
    </header>
  );
}
