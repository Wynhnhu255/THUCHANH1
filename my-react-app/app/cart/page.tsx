"use client";
import React, { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tải giỏ hàng từ localStorage
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct") || "null");
      
      if (buyNowProduct) {
        storedCart.push(buyNowProduct);
        localStorage.removeItem("buyNowProduct");
      }
      
      setCart(storedCart);
      setLoading(false);
    };
    
    loadCart();
  }, []);

  // Cập nhật localStorage khi cart thay đổi
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cart", JSON.stringify(cart));
      // Trigger storage event để cập nhật header
      window.dispatchEvent(new Event("storage"));
    }
  }, [cart, loading]);

  const updateQuantity = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const removeItem = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setCart(cart.filter(item => item.id !== id));
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const grandTotal = subtotal + shipping;

  if (loading) {
    return <div className="cart"><h2>Đang tải giỏ hàng...</h2></div>;
  }

  if (cart.length === 0) {
    return (
      <section className="cart">
        <h2>Giỏ hàng của bạn</h2>
        <div className="empty-cart">
          <h3>🛒 Giỏ hàng trống</h3>
          <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
          <a href="/">← Quay về trang chủ</a>
        </div>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2>Giỏ hàng của bạn</h2>
      <div className="cart-container">
        {cart.map((item) => (
          <div className="cart-item" key={item.id} data-id={item.id}>
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p className="item-description">Mô hình chất lượng cao chính hãng</p>
              <p className="item-price">{item.price.toLocaleString("vi-VN")}đ</p>
            </div>
            <div className="quantity-controls">
              <button className="qty-btn minus" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                min={1}
                className="quantity-input"
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
              />
              <button className="qty-btn plus" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className="item-total">
              <p className="total-price">{(item.price * item.quantity).toLocaleString("vi-VN")}đ</p>
              <button className="remove-btn" onClick={() => removeItem(item.id)}>
                🗑️ Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout">
        <div className="cart-summary">
          <p>
            Tạm tính: <span className="subtotal">{subtotal.toLocaleString("vi-VN")}đ</span>
          </p>
          <p>
            Phí vận chuyển: <span className="shipping">{shipping.toLocaleString("vi-VN")}đ</span>
          </p>
          <hr />
          <p className="grand-total">
            <strong>Tổng cộng: {grandTotal.toLocaleString("vi-VN")}đ</strong>
          </p>
        </div>
        <div className="checkout-actions">
          <a href="/" className="continue-shopping">
            ← Tiếp tục mua sắm
          </a>
          <button className="checkout-btn" onClick={() => alert("Chức năng thanh toán đang phát triển!")}>
            Thanh toán ngay
          </button>
        </div>
      </div>
    </section>
  );
}
