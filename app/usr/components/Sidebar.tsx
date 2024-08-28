'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import MainSubMenu from "./MainSubMenu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MenusList } from "@@/src/types/types";

export default function Sidebar() {
  const [menus, setMenus] = useState<MenusList[]>([]);
  const pathname = usePathname()
  const [isActive, setActive] = useState('')

  const isActivePageID = useCallback(() => {
    const storedMenus: string | null = localStorage.getItem('client_menus')
    if(!storedMenus) return false

    const menuslist = JSON.parse(storedMenus)
    const findIndex: number = menuslist.findIndex((res: MenusList) => res.route === pathname)
    setActive(menuslist[findIndex].id)
  }, [pathname])

  useEffect(() => {
    const storedMenus = localStorage.getItem('client_menus');
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    }
  }, []);

  useEffect(() => {
    isActivePageID()
  }, [pathname, isActivePageID])

  const LoopingMenus = (): ReactNode => {
    let dataFinal: any = {}
    menus.forEach((item) => {
      if(item.parent == ''){
        if(dataFinal[item.flag]){
          dataFinal[item.flag].push(item)
        }else{
          dataFinal[item.flag] = [item]
        }
      }
    })

    const splitActive = isActive ? isActive.split("_").slice(0, 2).join("_") : ''
    return (
      <div>
        {
          Object.entries(dataFinal).map((item: any, index: number) => {
            return (
              <div key={index}>
                <div className="p-2">
                  <h1 className="text-zinc-500 text-sm capitalize">{item[0]}</h1>
                </div>
                <div className="">
                  {
                    item[1].map((menu: MenusList, index2: number) => {

                      if(menu.show)
                      return (
                        <Link key={index2} href={menu.route}>
                          <button disabled={!menu.show} className={`full-hover text-sm flex items-center gap-2 py-3 px-5 relative ${menu.id == splitActive && 'bg-blue-200 hover:bg-blue-200'}`}>
                            <Icon icon={menu.icon} className="text-blue-500 text-xl"/>
                            {menu.name}
                          </button>
                        </Link>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    <div className="w-full xl:w-auto flex">
      <div className='w-full xl:w-56 xl:max-w-56 xl:min-w-56 border-r flex flex-col'>
        {/* <header className='px-2 py-5'>
          <h1>Menus</h1>
        </header> */}
        <div className='flex-1 space-y-2 overflow-y-auto'>
          {LoopingMenus()}
        </div>
      </div>
      <MainSubMenu active={isActive} menus={menus}/>
    </div>
  )
}
