
import { connect } from "react-redux";
import { getUsersThunkCreator,followThunk,unfollowThunk} from "../../redux/usersReducer";
import React from "react";  

import Users from "./Users"; 
import Preloader from "../common/Preloader";
import { getUsers, getCurrentPage,getPageSize,getTotalUserCount,getIsFollow, isFetching } from "../../redux/users-selecors";
import { compose } from "redux";

 class UsersAPIComponent extends React.Component{  
    
    componentDidMount(){    
        let { currentPage,pageSize} = this.props
       this.props.getUsersThunkCreator(currentPage, pageSize)
    }
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
    setCurrentPage(currentPage){  
       this.props.getUsersThunkCreator(currentPage, this.props.pageSize)
    }
    
    render(){   
        console.log('renderC')
        return( 
            <> 
            {this.props.isFetching ? <Preloader/> :( 
            <Users {...this.props}  
            setCurrentPage={this.setCurrentPage.bind(this)} 
            /> )}            
            </>
            
        )
    }
}
 
  
  
  
  
  
  
  
const mapStateToProps = (state)=>{   
    return{ 
        users: getUsers(state), 
        pageSize: getPageSize(state), 
        totalUsers: getTotalUserCount(state), 
        currentPage: getCurrentPage(state), 
        isFollowing: getIsFollow(state), 
        isFetching: isFetching(state)
    }
} 

export default compose( 
    connect(mapStateToProps,  
        { 
        getUsersThunkCreator, 
        unfollowThunk, 
        followThunk, 
        
    }) ,  
    
    
    )(UsersAPIComponent)
     
    
    
    
    
    
    
    // const mapDispatchToProps = (dispatch) =>{  
    //     debugger 
    //     return{  
        
    //         onFollow : (userId) =>{dispatch(followAC(userId))},
    //         unFollow: (userId) =>{dispatch(unfollowAC(userId))},  
    //         setTotalCount : (totalCount) =>{dispatch(setTotalCountAC(totalCount))}, 
    //         setUsers : (users) =>{dispatch(setUsersAC(users))}, 
    //         getCurrentPage: (currentPage) =>{dispatch(getCurrentPageAC(currentPage))},
    //         toggleFetching: (isFetching) =>{dispatch(toggleFetching(isFetching))}
    //     }
    // } 