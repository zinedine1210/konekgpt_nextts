'use client'
import { MenusList } from "@@/src/types/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Breadcrumb() {
    const pathname = usePathname()
    function generateCombinations(input: string): MenusList[] {
        const clientMenus: MenusList[] = JSON.parse(localStorage.getItem('client_menus') ?? 'null')
        const parts = input.split('/');
        const result: MenusList[] = [];
        for (let i = parts.length; i > 2; i--) {
            const pathRoute = parts.slice(0, i).join('/')
            let findIndex = clientMenus.findIndex(res => res.route == pathRoute)
            console.log(findIndex)
            if(findIndex == -1){
                findIndex = clientMenus.findIndex(res => res.id == `clm_${parts.slice(2, 3)}`)
            }
            result.push(clientMenus[findIndex])
        }

        return result;
    }

    const breadcrumblist: MenusList[] = generateCombinations(pathname)
  return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {
                    breadcrumblist && breadcrumblist.reverse().map((bread: MenusList, index: number) => {
                        return (
                            <li key={index}>
                                <div className="flex items-center">
                                    {index == 0 ? 
                                        <Icon icon={bread.icon} className="text-lg"/>
                                        :
                                        <Icon icon={'material-symbols-light:chevron-right'} className="text-lg"/>
                                    }
                                    <Link href={bread.route}>
                                        <button type={"button"} className="ms-1 text-sm font-medium hover:text-blue-300 md:ms-2 dark:text-gray-400 dark:hover:text-white">{bread.name}</button>
                                    </Link>
                                </div>
                            </li>

                        )
                    })
                }
            </ol>
        </nav>
  )
}
