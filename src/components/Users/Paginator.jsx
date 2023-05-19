import s from './Users.module.css' 
 const Paginator = props =>{ 
    let pagesCount = Math.ceil(props.totalUsers / props.pageSize)
    let pages = []; 
    for(let i = 1; i<= pagesCount; i++){ 
        pages.push(i)
    } 
    return(  
        <> 
        {pages.map(item =>{ 
            return(
                <button onClick={() => {props.setCurrentPage(item)}} className={props.currentPage === item && s.selectedItem}>{item}</button>
                )})} 
        </>
    )
} 
export default Paginator