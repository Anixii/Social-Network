
import { connect } from "react-redux";
import { getUsersThunkCreator,followThunk,unfollowThunk, FilterUserType} from "../../redux/usersReducer";
import React from "react";  

import Users from "./Users"; 
import Preloader from "../common/Preloader";
import { getUsers, getCurrentPage,getPageSize,getTotalUserCount,getIsFollow, isFetching } from "../../redux/users-selecors";
import { compose } from "redux"; 
import { UserActionType } from "../../redux/usersReducer";
import { AppStateType } from "../../redux/redux-store";
type MapStateToPropsType = {
    users: Array<UserActionType>,
    pageSize: number,
    totalUsers: number,
    currentPage: number,
    isFollowing: any,
    isFetching: boolean,
  };
  
  type MapDispatchToPropsType = {
    getUsersThunkCreator: (currentPage: number, pageSize: number, term:string) => void,
    unfollowThunk: (id:number|null) => void,
    followThunk: (id:number |null) => void,
  };
  
  type PropsType = MapStateToPropsType & MapDispatchToPropsType; 

 class UsersAPIComponent extends React.Component<PropsType>{  
    
    componentDidMount(){    
        let { currentPage,pageSize} = this.props
       this.props.getUsersThunkCreator(currentPage, pageSize, '')
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
    setCurrentPage(currentPage:number){   
       this.props.getUsersThunkCreator(currentPage, this.props.pageSize,'')
    } 
    onFilterChanged(filter: FilterUserType) { 
      this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize,filter.term)
    }
    
    render(){   
        return( 
            <> 
            {this.props.isFetching ? <Preloader/> :( 
            <Users {...this.props}  
            setCurrentPage={this.setCurrentPage.bind(this)} 
            onFilterChanged={this.onFilterChanged.bind(this)} 
            /> )}            
            </>
            
        )
    }
} 
const mapStateToProps = (state:AppStateType): MapStateToPropsType=>{   
    return{ 
        users: getUsers(state), 
        pageSize: getPageSize(state), 
        totalUsers: getTotalUserCount(state), 
        currentPage: getCurrentPage(state), 
        isFollowing: getIsFollow(state), 
        isFetching: isFetching(state)
    }
} 

export default compose<React.ComponentType>(
  connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
    mapStateToProps,
    { getUsersThunkCreator, unfollowThunk, followThunk }
  )
)(UsersAPIComponent);
     
    
    
    
    
    
    
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