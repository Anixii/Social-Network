import s from './Users.module.css'  
import { useState } from 'react';
 const Paginator = ({portionSize = 10,...props}) =>{  
    console.log(props);
    let pagesCount = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []; 
    for(let i = 1; i<= pagesCount; i++){ 
        pages.push(i)
    } 
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
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
                return <button className={props.currentPage === p ? s.selectedPage : s.unSelectedPage}
                onClick={(e) => {
                  props.setCurrentPage(p)               
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