import {Users} from "./Users"; 
import Preloader from "../common/Preloader";
import { isFetching,  } from "../../redux/users-selecors";
import { useSelector } from "react-redux";
const UserPage = () => {  
    const isFetch = useSelector(isFetching)
  return( 
    <> 
    {isFetch ? <Preloader/> :( 
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
    