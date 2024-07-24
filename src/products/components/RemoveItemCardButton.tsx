"use client";

import { removeItemToCardCookie } from "@/shopping-cart";
import { useRouter } from "next/navigation";
import { IoRemove } from "react-icons/io5"

interface Props {
  productId: string;
}

export const RemoveItemCardButton = ({ productId }: Props) => {
  const router = useRouter()

  const onRemoveItemCard = () => {
    removeItemToCardCookie(productId)
    router.refresh()
  }

  return (
    <button
      onClick={onRemoveItemCard}
      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
      <IoRemove size={20} />
    </button>
  )
}