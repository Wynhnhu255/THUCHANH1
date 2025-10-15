"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  features: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
};

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [mainImg, setMainImg] = useState("");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy chi tiết sản phẩm
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCurrentProduct(data.data);
          setMainImg(data.data.image);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [productId]);

  function addToCart() {
    if (!currentProduct) return;
    const product = { id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, image: mainImg, quantity: qty };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i: any) => i.id === product.id);
    if (existing) existing.quantity += product.quantity;
    else cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Đã thêm ${product.quantity} sản phẩm vào giỏ hàng!`);
  }

  if (loading) {
    return (
      <div>
        <main className="site-main">
          <h2>Đang tải...</h2>
        </main>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div>
        <main className="site-main">
          <h2>Không tìm thấy sản phẩm</h2>
          <a href="/">Quay lại trang chủ</a>
        </main>
      </div>
    );
  }

  return (
    <div>
      <main className="site-main">
        <div className="breadcrumb">
          <a href="/">Trang chủ</a> &gt; <a href="#">Anime</a> &gt; <span>{currentProduct.name}</span>
        </div>

        <section className="product-detail">
          <div className="product-images">
            <div className="main-image">
              <img id="mainImg" src={mainImg} alt={currentProduct.name} />
            </div>
            <div className="thumbnail-images">
              {currentProduct.images.map((img: string, index: number) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`${currentProduct.name} ${index + 1}`} 
                  className={`thumb ${mainImg === img ? "active" : ""}`} 
                  onClick={() => setMainImg(img)} 
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <h1>{currentProduct.name}</h1>
            <div className="rating"><span className="stars">★★★★★</span> <span className="rating-text">(4.8/5 - 156 đánh giá)</span></div>
            <div className="price-section">
              <span className="current-price">{currentProduct.price.toLocaleString('vi-VN')}đ</span>
              {currentProduct.oldPrice && <span className="old-price">{currentProduct.oldPrice.toLocaleString('vi-VN')}đ</span>}
              {currentProduct.oldPrice && <span className="discount">-{Math.round((1 - currentProduct.price / currentProduct.oldPrice) * 100)}%</span>}
            </div>

            <div className="product-features">
              <h3>Đặc điểm nổi bật:</h3>
              <ul>
                {currentProduct.features.map((feature: string, index: number) => (
                  <li key={index}>{feature}</li>
                ))}
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
              <button className="buy-now" onClick={() => { addToCart(); window.location.href = '/cart'; }}>⚡ Mua ngay</button>
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