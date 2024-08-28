import { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from '@iconify/react';
import { usePathname } from "next/navigation";
import { MenusList } from "@@/src/types/types";

export default function MainSubMenu({
    active,
    menus
}: {
    active: string,
    menus: MenusList[]
}) {
    const [submenu, setSubMenu] = useState<MenusList[]>([])
    const pathname = usePathname()


    useEffect(() => {
        if(menus && active){
            const split = active.split("_").slice(0, 2).join("_")
            const filter = menus.filter(res => res.parent === split)
            setSubMenu(filter)
        }
    }, [active, menus])

    if(submenu.length > 0)
  return (
    <div className="hidden md:block max-w-56 min-w-56 w-full overflow-hidden border-r-2 duration-300 ease-in-out transition-all">
        {
            submenu.map((item: MenusList, index: number) => {
                return (
                    <div key={index}>
                        {index == 0 && (
                            <div className="p-2">
                                <h1 className="text-zinc-500 text-sm capitalize">{item.flag}</h1>
                            </div>
                        )}
                        <Link key={index} href={item.route}>
                            <button className={`${item.route == pathname && 'bg-blue-200 hover:bg-blue-200'} full-hover text-sm flex items-center gap-2 py-3 px-5`}>
                                <Icon icon={item.icon} className="text-xl text-blue-500"/>
                                {item.name}
                            </button>
                        </Link>
                    </div>
            )
            })
        }
    </div>
  )
}
