import {Users} from "./Users"; 
import Preloader from "../common/Preloader";

import { useSelector } from "react-redux";
import { AppDispatch, AppStateType } from "../../redux/redux-store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersThunkCreator } from "../../redux/usersReducer";
const UserPage = () => {  
    const {isFetching, pageSize, currentPage,filter} = useSelector((state:AppStateType) => state.usersPage) 
    const dispatch:AppDispatch  = useDispatch() 
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
    