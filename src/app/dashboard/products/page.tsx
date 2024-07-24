import { ProductCard, products } from "@/products";

export default function ProductsPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
        {
          products.map(product => (<ProductCard key={product.id} product={product} />))
        }
      </div>
    </div>
  );
}