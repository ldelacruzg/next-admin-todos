import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="flex flex-col">
      <h3 className="font-bold">User connected with Server Side</h3>
      <div className="flex flex-col">
        <span>Name: {session?.user?.name ?? 'No name'}</span>
        <span>Email: {session?.user?.email ?? 'No email'}</span>
        <span>Image: {session?.user?.image ?? 'No image'}</span>
      </div>
    </div>
  );
}