import ProductCatalog from "@/components/ProductCatalog";
import { getAllProducts } from "@/lib/db";

export default function Home() {
  const products = getAllProducts();

  return <ProductCatalog products={products} />;
}
