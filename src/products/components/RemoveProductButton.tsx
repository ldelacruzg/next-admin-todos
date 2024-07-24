"use client";

import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5"

import { removeProductToCardCookie } from "@/shopping-cart";

interface Props {
  productId: string;
}

export const RemoveProductButton = ({ productId }: Props) => {
  const router = useRouter()

  const onRemoveProductCard = () => {
    removeProductToCardCookie(productId)
    router.refresh()
  }

  return (
    <button
      onClick={onRemoveProductCard}
      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
      <IoTrashOutline size={20} />
    </button>
  )
}