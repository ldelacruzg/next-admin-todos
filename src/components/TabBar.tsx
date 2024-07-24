"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { useState } from "react";

interface Props {
  tabOptions?: number[];
  currentTab?: number;
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4], currentTab = 1 }: Props) => {
  const router = useRouter()
  const [seletedTab, setSeletedTab] = useState(currentTab);

  const onSeletedTab = (seletedTab: number) => {
    setSeletedTab(seletedTab)
    setCookie('seletedTab', seletedTab.toString())
    router.refresh()
  }

  return (
    <div className={`grid grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}>
      {
        tabOptions.map(option => (
          <div key={option}>
            <input
              checked={seletedTab === option} onChange={() => { }}
              type="radio" id={option.toString()} className="peer hidden" />
            <label onClick={() => onSeletedTab(option)} className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {option}
            </label>
          </div>
        ))
      }
    </div>
  )
}