import { Metadata } from "next";
import { cookies } from "next/headers";

import { TabBar } from "@/components";

export const metadata: Metadata = {
  title: "Cookies Pages",
  description: "Cookies Pages"
}

export default function CookiesPage() {
  const cookieStore = cookies()
  const currentTab = Number(cookieStore.get('seletedTab')?.value ?? 1)

  return (
    <div>
      <h3>Tabs</h3>
      <TabBar currentTab={currentTab} />
    </div>
  );
}