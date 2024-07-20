// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { TopMenu, Sidebar } from '@/components';
import { IoCalendarOutline, IoCheckboxOutline, IoListOutline } from 'react-icons/io5';

const menu = [
  {
    title: "Dashboard",
    icon: <IoCalendarOutline />,
    path: "/dashboard"
  },
  {
    title: "Todos",
    icon: <IoCheckboxOutline />,
    path: "/dashboard/todos"
  },
  {
    title: "Server Actions",
    icon: <IoListOutline />,
    path: "/dashboard/server-actions"
  }
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar menu={menu} />

      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />

        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-6 pt-6">
          {children}
        </div>
      </div>
    </>
  );
}