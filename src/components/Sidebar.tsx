import Image from "next/image"
import { SidebarItem } from "./SidebarItem"
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorking, IoListOutline } from "react-icons/io5";

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
    path: "/dashboard/server-todos"
  },
  {
    title: "Cookies",
    icon: <IoCodeWorking />,
    path: "/dashboard/cookies"
  },
  {
    title: "Products",
    icon: <IoBasketOutline />,
    path: "/dashboard/products"
  }
]

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <a href="#" title="home">
            {/* Next/Image */}
            <Image priority src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" width={0} height={0} />
          </a>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image priority src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={0} height={0} />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: src/components <SidebarItem /> */}
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}
          {
            menu.map((item) => (<SidebarItem
              key={item.path}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />))
          }
        </ul>
      </div>
    </aside>
  )
}