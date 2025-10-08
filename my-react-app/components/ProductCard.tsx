import React from "react";

type Props = {
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ name, price, image }: Props) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p className="price">Price: ${price}</p>
    </div>
  );
}
