import clsx from "clsx"
import { Link } from "react-router-dom"
import { useCalendarData } from "../core/CalendarDataProvider"
import { useCalendarView } from "../core/CalendarViewProvider"
import { Branch } from "../../branch/core/_models"

export const FullCalendarTab = (props:any) => {
    const {branches} = useCalendarData()
    const {activeTab, setActiveTab} = useCalendarView()
    const branchIDs = props.branches as string;
    let filteredBranches: Branch[];
    if(branchIDs){
        filteredBranches = branches.filter( branch => branchIDs.includes(branch.id + ''))
    }else{
        filteredBranches = branches
    }
    return (
        <div className='px-6 pb-2'>
            <ul className='nav nav-stretch nav-line-tabs fw-bold border-transparent flex-nowrap' role='tablist'>
                {filteredBranches && filteredBranches.map(branch => {
                    return (
                        <li className='nav-item mt-3' key={branch.id}>
                            <Link to="#"
                                className={clsx(`nav-link cursor-pointer text-gray-700`, {
                                    active: activeTab === branch.id,
                                })}
                                onClick={() => setActiveTab(branch.id)}
                                role='tab'
                            >
                                {branch.name}
                            </Link>
                        </li>
                    )
                })}
            </ul>    
        </div>
    )
   
}