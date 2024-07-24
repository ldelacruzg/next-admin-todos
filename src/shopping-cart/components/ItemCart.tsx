import Image from "next/image";

import type { Product } from "@/products"
import { AddProductButton } from "@/products/components/AddProductButton";
import { RemoveItemCardButton } from "@/products/components/RemoveItemCardButton";

interface Props {
  product: Product;
  quantity: number;
}

export const ItemCard = ({ product, quantity }: Props) => {
  return (
    <div className="flex items-center shadow rounded-lg w-full bg-gray-800 border-gray-100">
      {/* Product Image */}
      <div className="p-2">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={product.image}
          alt={product.name} />
      </div>

      {/* Title */}
      <div className="px-5 pb-5 w-full flex flex-col mt-2">
        <a href="#">
          <h3 className="font-semibold text-xl tracking-tight text-white">
            {product.name} - <small className="text-sm">${product.price.toFixed(2)}</small>
          </h3>
        </a>

        {/* Price and Add to Cart */}
        <div className="flex flex-col items-start justify-between">

          <span className="text-gray-900 dark:text-white">
            Cantidad: {quantity}
          </span>
          <span className="font-bold text-white">
            Total: ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex p-5 items-center justify-center">
        <AddProductButton productId={product.id} />
        <span className="text-2xl text-white mx-10">{quantity}</span>
        <RemoveItemCardButton productId={product.id} />
      </div>
    </div>
  )
}