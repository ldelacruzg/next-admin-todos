"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  icon: React.ReactNode;
  title: string;
}

export const SidebarItem = ({ path, icon, title }: Props) => {
  const pathName = usePathname();

  const isActive = pathName === path ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400" : "";

  return (
    <li>
      <Link href={path} className={`
          px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group 
          hover:text-white hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400
          ${isActive}`}>
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  )
}