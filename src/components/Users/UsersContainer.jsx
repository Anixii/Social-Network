
import { connect } from "react-redux";
import { getUsersThunkCreator,followThunk,unfollowThunk} from "../../redux/usersReducer";
import React from "react";  

import Users from "./Users"; 
import Preloader from "../common/Preloader";
import { withAuthRedirect } from "../../hoc/AuthRedirect";


 class UsersAPIComponent extends React.Component{  
    
    componentDidMount(){   
       this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }
    setCurrentPage(currentPage){  
       this.props.getUsersThunkCreator(currentPage, this.props.pageSize)
    }
    
    
    render(){  
        
        return( 
            <> 
            {this.props.isFetching ? <Preloader/> :(<Users users={this.props.users}  
            unfollowThunk={this.props.unfollowThunk} 
            followThunk={this.props.followThunk}
            totalUsers={this.props.totalUsers} 
            currentPage={this.props.currentPage}  
            setCurrentPage={this.setCurrentPage.bind(this)} 
            pageSize={this.props.pageSize}  
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

let withRedirect = withAuthRedirect(UsersAPIComponent)
export default connect(mapStateToProps,  
        { 
        getUsersThunkCreator, 
        unfollowThunk, 
        followThunk,
    }) 
        (withRedirect)