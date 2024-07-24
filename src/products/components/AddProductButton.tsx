"use client";

import { addProductToCardCookie } from "@/shopping-cart";
import { useRouter } from "next/navigation";
import { IoAddCircleOutline } from "react-icons/io5"

interface Props {
  productId: string;
}

export const AddProductButton = ({ productId }: Props) => {
  const router = useRouter()

  const onAddProductCard = () => {
    addProductToCardCookie(productId)
    router.refresh()
  }

  return (
    <button
      onClick={onAddProductCard}
      className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      <IoAddCircleOutline size={25} />
    </button>
  )
}