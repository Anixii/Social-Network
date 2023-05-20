
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
    setCurrentPage(currentPage){  
       this.props.getUsersThunkCreator(currentPage, this.props.pageSize)
    }
    
    
    render(){   
        console.log('render')
        return( 
            <> 
            {/* {this.props.isFetching ? <Preloader/> :( 
            <Users users={this.props.users}  
            unfollowThunk={this.props.unfollowThunk} 
            followThunk={this.props.followThunk}
            totalUsers={this.props.totalUsers} 
            currentPage={this.props.currentPage}  
            setCurrentPage={this.setCurrentPage.bind(this)} 
            pageSize={this.props.pageSize}  
            isFollowing={this.props.isFollowing}
            /> )} */}
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