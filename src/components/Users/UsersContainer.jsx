
import { connect } from "react-redux";
import { followAC, setUsersAC, unfollowAC, getCurrentPageAC, setTotalCountAC, toggleFetching } from "../../redux/usersReducer";
import React from "react";  
import axios from "axios";
import Users from "./Users"; 
import Preloader from "../common/Preloader";

 class UsersAPIComponent extends React.Component{  
    
    componentDidMount(){  
        this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`) 
            .then(response =>{  
            this.props.toggleFetching(false)
            this.props.setUsers(response.data.items) 
            this.props.setTotalCount(response.data.totalCount)
            console.log('a')
            }) ;
    }
    setCurrentPage(currentPage){  
        this.props.toggleFetching(true)
        this.props.getCurrentPage(currentPage); 
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`) 
            .then(response =>{  
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)           
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
            pageSize={this.props.pageSize}/> )}
            
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
        isFetching: state.usersPage.isFetching
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
        toggleFetching}) 
        (UsersAPIComponent)