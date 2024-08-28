import { Icon } from "@iconify/react/dist/iconify.js";

const Pagination = ({page, pagerList, handleNext, handlePrev, handleBackward, handleForward, handleClickPage}: {
    page: number,
    pagerList: number,
    handleNext: any,
    handlePrev: any,
    handleBackward: any,
    handleForward: any,
    handleClickPage: any
}) => {
    let minPage = 1
    let maxPage = 5
    if(page > 3){
        minPage = page - 2
        maxPage = page + 2
        if(maxPage > pagerList){
            if(maxPage - pagerList < 2){
                minPage = page - 3
                maxPage = page + 1
            } else {
                let varPage = page - 4
                minPage = page - 4 === 0 ? 1:varPage
                maxPage = page
            }
        }
    } else {
        if(maxPage > pagerList){
            maxPage = pagerList
        }
    }
   
 
    let arrayPages = []

    for(var i=minPage, l=maxPage; i<=l; i++){
        arrayPages.push(i)
    }

    return (
        <div className="flex justify-between">
            <div className="flex items-center space-x-1">
                <button type="button" disabled={!(page > 1)} onClick={handleBackward} className="disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm flex items-center">
                    <span title="previous" >
                        <Icon icon={'system-uicons:backward'} className="text-2xl"/>
                    </span>
                    Backward
                </button>
                <button type="button" onClick={handlePrev} disabled={!(page > 1)} className="disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm flex items-center">
                    <span title="previous">
                        <Icon icon={'fluent:arrow-previous-20-filled'} className="text-2xl"/>
                    </span>
                    Previous
                </button>
            </div>

            <div className="flex items-center space-x-1">
                {
                    arrayPages && arrayPages.length > 0 ? arrayPages.map((e, i) => {
                            return <button key={i} onClick={() => handleClickPage(e)}><div className={`cursor-pointer flex items-center justify-center w-9 h-9 rounded-md dark:text-white ${page === e ? 'bg-blue-100 text-blue-500 border border-blue-200':''}`} key={i}><span className={`page-link ${page === e ? '':''}`}>{e}</span></div></button>
                    }):''
                }
            </div>

            <div className="flex items-center space-x-1">
                <button type="button" onClick={handleNext} disabled={!(page < pagerList)} className="disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm flex items-center">
                    Next
                    <span title="next" >
                        <Icon icon={'fluent:arrow-next-20-filled'} className="text-2xl"/>
                    </span>
                </button>
                <button type="button" disabled={!(page < pagerList)} onClick={handleForward} className="disabled:cursor-not-allowed disabled:bg-zinc-300 py-2 px-5 gap-2 bg-white hover:bg-zinc-200 duration-300 ease-in-out rounded-md text-sm flex items-center">
                    Forward
                    <span title="forward">
                        <Icon icon={'system-uicons:forward'} className="text-2xl"/>
                    </span>
                </button>

            </div>
        </div>
    );
};

export default Pagination;