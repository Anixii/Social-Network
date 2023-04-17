
import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC, getCurrentPageAC, setTotalCountAC, toggleFetching,toggleFollowingInProgress } from "../../redux/usersReducer";
import React from "react";  

import Users from "./Users"; 
import Preloader from "../common/Preloader";
import { userAPI } from "../../api/api";

 class UsersAPIComponent extends React.Component{  
    
    componentDidMount(){   
        this.props.toggleFetching(true)
        userAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(response =>{  
            this.props.toggleFetching(false)
            this.props.setUsers(response.items) 
            this.props.setTotalCount(response.totalCount)
            
            }) ;
    }
    setCurrentPage(currentPage){  
        this.props.toggleFetching(true)
        this.props.getCurrentPage(currentPage); 
        userAPI.getUsers(currentPage, this.props.pageSize).then(response =>{  
                this.props.toggleFetching(false)
                this.props.setUsers(response.items)           
            }) ;
    }
    
    
    render(){  
        
        return( 
            <> 
            {this.props.isFetching ? <Preloader/> :(<Users users={this.props.users}  
            totalUsers={this.props.totalUsers} 
            currentPage={this.props.currentPage} 
            onFollow={this.props.onFollow} 
            unFollow={this.props.unFollow} 
            setCurrentPage={this.setCurrentPage.bind(this)} 
            pageSize={this.props.pageSize} 
            toggleFollowing ={this.props.toggleFollowingInProgress} 
            isFollowing={this.props.isFollowing}
            /> )}
            
            </>
            
        )
    }
}
  
const mapStateToProps = (state)=>{   
    return{ 
        users: state.usersPage.users, 
        pageSize: state.usersPage.pageSize, 
        totalUsers: state.usersPage.totalUsers, 
        currentPage: state.usersPage.currentPage, 
        isFetching: state.usersPage.isFetching, 
        isFollowing: state.usersPage.followingInProgress
    }
} 
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
export default connect(mapStateToProps,  
        { 
        onFollow : followAC,
        unFollow:unfollowAC,  
        setTotalCount : setTotalCountAC, 
        setUsers : setUsersAC, 
        getCurrentPage: getCurrentPageAC,
        toggleFetching, toggleFollowingInProgress}) 
        (UsersAPIComponent)