"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"

export const LogoutButton = () => {

  const { status } = useSession()

  if (status === 'loading') {
    return (
      <button className="flex items-center gap-2 group rounded-md px-4 py-3">
        <CiLogout />
        <span className="group-hover:text-gray-700">Cargando...</span>
      </button>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <button onClick={() => signIn()} className="flex items-center gap-2 group rounded-md px-4 py-3">
        <CiLogout />
        <span className="group-hover:text-gray-700">LogIn</span>
      </button>
    )
  }

  return (
    <button onClick={() => signOut()} className="flex items-center gap-2 group rounded-md px-4 py-3">
      <CiLogout />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  )
}