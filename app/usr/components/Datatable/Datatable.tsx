import { useGlobalContext } from "@@/src/context/GlobalContext"
import Pagination from "./Pagination"
import { useState } from "react"
import { StateType } from "@@/src/types/types"
import { displayListNumber } from "../../knowledge/attachment/lib/table"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Notify } from "@@/src/utils/script"

export default function Datatable({
    statename
}: {
    statename: string
}) {
    const { state, setState } = useGlobalContext()
    const [status, setStatus] = useState<string>('')
    const property: StateType<any> = state[statename]
    // property 
    const display = property.display
    const headers = property.headers
    const data = property.data
    const columns = property.columns
    const page = property.page
    const totalCount = property.totalCount

    const handleNext = async () => {
        const totalCount = property?.totalCount
        const display = property?.display
        const maxPage = Math.ceil(totalCount / display)
        const page = property?.page

        if(page == maxPage){
            setStatus("Penuh")
        }

        if(page < maxPage){
            const addpage = page + 1
            property.page = addpage
            property.onGet()
        }
        setState({ ...state, [statename]: property })
    }

    const handlePrev = () => {
        const page = property?.page
        if(page > 1){
            const minPage = page - 1
            property.page = minPage
            property.onGet()
        }
        setState({ ...state, [statename]: property })
    }

    const handleBackward = () => {
        const page = property?.page
        if(page !== 1){
            property.page = 1
            property.onGet()
        }
        setState({ ...state, [statename]: property })
    }

    const handleForward = () => {
        const totalCount = property?.totalCount
        const display = property?.display
        const forwardPage = Math.ceil(totalCount / display)
        const page = property?.page
        if(page < forwardPage){
            property.page = forwardPage
            property.onGet()
        }
        setState({ ...state, [statename]: property })
    }

    const handleClickPage = async (value: number) => {
        property.page = value
        property.onGet()
        setState({ ...state, [statename]: property })
    }

    const handleDisplay = (value: number) => {
        property.display = value
        const totalCount = property?.totalCount
        const page = property?.page
        const maxpage = Math.ceil(totalCount/value)
        if(page > maxpage){
            property.page = maxpage
            property.onGet()
        }else{
            property.onGet()
        }
        setState({ ...state, [statename]: property })
    }

    const handleSort = (name: any) => {
        let copyData = columns
        if(copyData[0]['data'] == name){
            copyData[0]['dir'] = copyData[0]['dir'] == "asc" ? "desc":"asc"
        }else{
            copyData[0]['data'] = name
            copyData[0]['dir'] = "asc"
        }
        setState({ ...state, [statename]: property })
    }

    const handleCopy = (text: string, name: string, copy: string) => {
        console.log(text, copy, name)
        if(!copy){
            return false
        }
        navigator.clipboard.writeText(text).then(() => {
            Notify(`${name} copy to clipboard`, 'info', 2000)
        })
    }

    const showing = totalCount > 0 ? (display * page) - display + 1 : 0
    const showingTo = display * page > totalCount ? totalCount: display * page
    
  return (
    <>
        <div className="relative overflow-x-auto">
            <h1 className="mb-5 dark:text-white">Showing { showing } to { showingTo } of {totalCount} Entries</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-xl">
                <thead className="bg-white dark:bg-dark text-sm text-gray-700 uppercase dark:text-gray-400 rounded-xl">

                    {/* HEADERS LOOPING */}
                    <tr className="bg-white border-b-2 border-black">
                        {
                            headers.map((head, key) => {
                                if(head.sort)
                                return (
                                    <th scope="col" key={key} className="px-5 py-4 group">
                                        <div className="flex items-center gap-2">
                                            {head.label}
                                            <button onClick={() => handleSort(head.sort)} className={`${columns.find((res: any) => res.data == head.sort) ? "bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center visible opacity-100 dark:text-black" : "dark:text-white opacity-0 invisible"} group-hover:visible duration-300 group-hover:opacity-100`}>
                                                {
                                                    columns.find((res: any) => res.data == head.sort) && columns.find((res: any) => res.data == head.sort)?.dir == "asc" ? <Icon icon={'ph:arrow-up'}/> : <Icon icon={'ph:arrow-down'} className="text-lg"/>
                                                }
                                            </button>
                                        </div>
                                    </th>
                                )

                                return (
                                    <th key={key} scope="col" className={`px-5 py-4 ${head.cssHead}`}>
                                        {head.label}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>

                    {/* DATA LOOPING */}
                    {
                        property.isLoading && !data ?
                            new Array(Number(display)).fill("anything").map((load, loadIndex) => {
                                return (
                                    "sekeleton"
                                )
                            })
                        :
                        data.length > 0 ?
                            data.slice(showing, showingTo).map((item, key) => {
                                return (
                                    <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700  font-monospace odd:dark:bg-dark2 odd:bg-dark2 odd:bg-opacity-20 even:dark:bg-dark">
                                        {
                                            headers.map((head: any, headIndex) => {
                                                return (
                                                    <td key={headIndex} onClick={() => handleCopy(item[head.copy], head.label, head.copy)} className={`px-5 py-4 ${head.cssRow} ${head.copy && "select-all"}`}>
                                                        { 
                                                            head.status ?
                                                            <div style={{backgroundColor:`${head.status[item[head.property]]}`}} className={`text-center rounded-full my-1 text-xs py-1 px-4 w-fit text-white`}>
                                                                { item?.[head.property] }
                                                            </div>
                                                            :
                                                            item?.[head.property]
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        :
                        <tr className="col-span-full h-56 w-full">
                            <th className="col-span-full w-full" colSpan={11}>
                                <div className="relative w-72 mx-auto">
                                    <p className="w-36 pb-12 ml-10 text-light font-bold absolute top-1/2 -translate-y-1/2 ">Oops, no data match your filters</p>
                                    {/* <img src="/images/internal/notfound.png" alt="Not Found" className="block dark:hidden ml-auto" />
                                    <img src="/images/internal/notfound_dark.png" alt="Not Found" className="hidden dark:block ml-auto" /> */}
                                </div>
                            </th>
                        </tr>

                    }
                </tbody>
            </table>
        </div>
        {/* <div className="xl:flex items-center justify-between mt-5 hidden">
            <h1 className="text-sm text-cText dark:text-white">Showing { showing } to { showingTo } of {totalCount} Entries</h1>
            <div className="flex items-center gap-5">
                <div className="flex items-center ">
                    <h1 className="text-sm text-cText dark:text-white">Display </h1>
                    <select onChange={(e) => handleDisplay(Number(e.target.value))} name="display" id="displaySelect" className="bg-transparent px-2 outline-none">
                        {
                            displayListNumber.map((item, index) => {
                                return (
                                    <option className="dark:text-black" key={index} value={item.value}>{item.label}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        </div> */}
        <div className="mt-5">
            <Pagination
                handleNext={handleNext} 
                handlePrev={handlePrev} 
                handleForward={handleForward}
                handleBackward={handleBackward}
                handleClickPage={(e: any) => handleClickPage(e)}
                page={page} 
                pagerList={Math.ceil(totalCount/display)}
            />
        </div>
    </>
  )
}
