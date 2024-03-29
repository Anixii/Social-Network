import s from './Users.module.css'  
import React, { useState } from 'react'; 
type Props = { 
    portionSize?: number , 
    totalUsers: number, 
    pageSize: number, 
    currentPage: number
    setCurrentPage: (pageNumber: number) => void
}
 const Paginator:React.FC<Props> = ({portionSize = 10,totalUsers,pageSize,currentPage,setCurrentPage}) =>{  
    let pagesCount = Math.ceil(totalUsers / pageSize)
    let pages:Array<number> = []; 
    for(let i = 1; i<= pagesCount; i++){ 
        pages.push(i)
    } 
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1) 
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return <div className={s.pagination}>
        {portionNumber > 1 ?
            <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Previous</button> : null
        }
        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p, index) => {
                return <button className={currentPage === p ? s.selectedPage : s.unSelectedPage}
                onClick={(e) => {
                  setCurrentPage(p)               
                }}              
                key={index}>{p}</button>
            })}
        {portionCount > portionNumber ?
            <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button> : null
        }
    </div>
} 
export default Paginator