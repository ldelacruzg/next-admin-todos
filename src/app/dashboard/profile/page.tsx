"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h3 className="font-bold">Profile (Client Side)</h3>
      <hr />
      <div className="flex flex-col">
        <span>Name: {session?.user?.name ?? 'No name'}</span>
        <span>Email: {session?.user?.email ?? 'No email'}</span>
        <span>Image: {session?.user?.image ?? 'No image'}</span>
      </div>
    </div>
  );
}