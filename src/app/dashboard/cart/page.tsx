import { Metadata } from "next";
import { cookies } from "next/headers";

import { ItemCard } from "@/shopping-cart";
import { Product, products as productList } from "@/products";

export const metadata: Metadata = {
  title: "Shopping Cart"
}

interface ProductsInCart {
  product: Product,
  quantity: number;
}

const getProductsInCart = (cart: Record<string, number>): ProductsInCart[] => {
  return Object.keys(cart).map(productId => {
    const product = productList.find(p => p.id === productId)!
    const quantity = cart[productId]
    return { product, quantity }
  })
}

export default function CartPage() {
  const cookieStore = cookies()
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as Record<string, number>
  const productsInCart = getProductsInCart(cart)

  const subtotal = productsInCart.reduce((prevValue, currentValue) => prevValue + (currentValue.product.price * currentValue.quantity), 0)
  const impuesto = subtotal * 0.15
  const total = subtotal + impuesto

  return (
    <div>
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <hr className="mb-2" />
      <div className="grid grid-cols-3 gap-2">
        <div className="grid col-span-2 gap-2">
          {
            productsInCart.map(item => (
              <ItemCard
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))
          }
        </div>
        <div className="flex flex-col gap-2 bg-gray-200 p-4 rounded">
          <h3 className="font-bold text-xl uppercase">Resumen de la orden</h3>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Impuesto 15%</span>
            <span>$ {impuesto.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>$ {total.toFixed(2)}</span>
          </div>
          <button type="button" className="bg-[#1f2937] text-white font-bold p-2 rounded uppercase">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}