'use client';

import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/db';

type ProductCatalogProps = {
  products: Product[];
};

function formatCurrency(value: number) {
  return `${new Intl.NumberFormat('vi-VN').format(value)} VND`;
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const hasProducts = Array.isArray(products) && products.length > 0;

  const handleAddToCart = (product: Product) => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const cartRaw = window.localStorage.getItem('cart');
      const cart = cartRaw ? JSON.parse(cartRaw) : [];

      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      window.localStorage.setItem('cart', JSON.stringify(cart));
      window.alert(`Da them ${product.name} vao gio hang!`);
    } catch (error) {
      console.error('Unable to update cart', error);
    }
  };

  if (!hasProducts) {
    return (
      <section className="product-list">
        <h2>Khong co san pham nao</h2>
      </section>
    );
  }

  return (
    <section className="product-list">
      <h2>San pham noi bat</h2>
      <div className="products">
        {products.map((product) => {
          const hasOldPrice = typeof product.oldPrice === 'number';

          return (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">
                {formatCurrency(product.price)}{' '}
                {hasOldPrice ? (
                  <span className="old-price">
                    {formatCurrency(product.oldPrice as number)}
                  </span>
                ) : null}
              </p>
              <div className="card-buttons">
                <button
                  className="btn detail-btn"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  Xem chi tiet
                </button>
                <button
                  className="btn add-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Them vao gio
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
