import {Users} from "./Users"; 
import Preloader from "../common/Preloader";

import { useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersThunkCreator } from "../../redux/usersReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
const UserPage = () => {    
  const [searchParams, setSearchParams] = useSearchParams()
    const history = useNavigate() 
    
    const {isFetching, pageSize, currentPage,filter} = useSelector((state:AppStateType) => state.usersPage) 
    const dispatch:AppDispatch  = useDispatch()  

    // useEffect(() =>{ 
    //   history(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
    // },[filter, history,currentPage]) 

    useEffect(() =>{ 
      const result: any = {}
      // @ts-ignore
      for (const [key, value] of searchParams.entries()) {
        let value2: any = +value
        if (isNaN(value2)) {
           value2 = value 
        }
        if (value === 'true') { 
           value2 = true
        } else if (value === 'false') { 
           value2 = false
        } 
 
        result[key] = value2
     }

     let actualPage = result.page || currentPage
     let term = result.term || filter.term

     let friend = result.friend || filter.friend
     if (result.friend === false) {
        friend = result.friend
     }

     const actualFilter = {friend, term}

     dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
      
    }, [searchParams, currentPage, filter, pageSize,dispatch])
     
    useEffect(() => {

      const term = filter.term
      const friend = filter.friend
      console.log(filter);
      
      let urlQuery =
         (term === '' ? '' : `&term=${term}`)
         + (friend === null ? '' : `&friend=${friend}`)
         + (currentPage === 1 ? '' : `&page=${currentPage}`)

      setSearchParams(urlQuery)


   }, [filter, currentPage,setSearchParams])
    
    useEffect(() =>{  
      dispatch(getUsersThunkCreator(currentPage, pageSize, filter)) 
  }, [currentPage, pageSize, filter,dispatch])
  return( 
    <> 
    {isFetching ? <Preloader/> :( 
    <Users /> )}            
    </>
  )
} 
export default UserPage


    
    
    
        // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.color !== nextProps.color) {
    //       return true;
    //     }
    //     if (this.state.count !== nextState.count) {
    //       return true;
    //     }
    //     return false;
    //   } 
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.users !== nextState.users) {
    //       return true;
    //     }
    //     return false;
    //   }
    