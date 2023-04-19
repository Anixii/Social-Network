import { userAPI,followAPI } from "../api/api" 
 
const FOLLOW = 'FOLLOW'
const CURRENT_PAGE = 'CURRENT-PAGE'
const UNFOLLOW = 'UNFOLLOW'  
const SET_USERS = 'SET-USERS'  
const TOTAL_COUNT = 'TOTAL-COUNT' 
const TOGGLE_FETCHING = 'TOGGLE_FETCHING' 
const TOGGLE_IS_FOLLOWING ='TOGGLE_IS_FOLLOWING'
 

let initialState = { 
    users:[], 
    pageSize:25, 
    totalUsers: 10, 
    currentPage:1, 
    isFetching: false, 
    followingInProgress :  {
        isFetching: false,
        userId: null
    }
} 

const usersReducer = (state = initialState, action) =>{ 

    switch(action.type){  
        case FOLLOW: 
           return{ 
                ...state, 
                users: state.users.map( (item)=> {  
                    if(item.id === action.userId){  
                        return{...item, followed:true}
                    } 
                    
                    return item;
                }), 
            }
        case UNFOLLOW:{   
       
        return{ 
            ...state, 
            users:state.users.map( (item)=> {  

                if(item.id === action.userId){  
                  
                    return{...item, followed:false}
                }  
               
               return item
                
            }), 
        } }
        case SET_USERS:{  
            
            return { ...state, users: action.users }
        } 
        case CURRENT_PAGE:{ 
            return { 
                ...state, 
                currentPage: action.currentPage
            }
        } 
        case TOTAL_COUNT : { 
            return{ 
                ...state, 
                totalUsers: action.totalCount
            }
        } 
        case TOGGLE_FETCHING : { 
            return{ 
                ...state, 
                isFetching: action.isFetching
            }
        } 
        case TOGGLE_IS_FOLLOWING : {  
            
            return {
                ...state,
                followingInProgress: {
                    ...state.followingInProgress,
                    isFollowing: action.isFollowing,
                    userId:      action.userId
                }
            };
        }
        default:  
    
         return state
    }
    
}  
export const followAC = (userId) =>{ 
    return{ 
        type: FOLLOW,   
        userId,
    }
} 
export const unfollowAC = (userId) =>({ type: UNFOLLOW, userId})
export const setUsersAC = (users) =>({type: SET_USERS, users}) 
export const getCurrentPageAC = (currentPage) => ({type: CURRENT_PAGE, currentPage})
export const setTotalCountAC = (totalCount) =>({type:TOTAL_COUNT, totalCount})    
export const toggleFetching = (isFetching) =>({type:TOGGLE_FETCHING, isFetching})   
export const toggleFollowingInProgress = (isFollowing,userId) => ({type: TOGGLE_IS_FOLLOWING, isFollowing, userId})
 


export const getUsersThunkCreator = (currentPage,pageSize) => { 
return (dispatch) => 
//замыкание 
{ 
    dispatch(toggleFetching(true)) 
    dispatch(getCurrentPageAC(currentPage)); 
    userAPI.getUsers(currentPage, pageSize)
        .then(response =>{  
        dispatch(toggleFetching(false))
        dispatch(setUsersAC(response.items)) 
        dispatch(setTotalCountAC(response.totalCount))
        
        }) ;
} 
}  
export const unfollowThunk = (id) => { 
    return (dispatch) => { 
        dispatch(toggleFollowingInProgress(true, id))
        followAPI.unFollow(id)
        .then(response =>{  
        if(response.data.resultCode === 0){ 
            dispatch(unfollowAC(id))           
        }  
        dispatch(toggleFollowingInProgress(false, null))
    }) ;
    }
} 
export const followThunk = (id) => { 
    return (dispatch) => { 
        dispatch(toggleFollowingInProgress(true, id))
        followAPI.onFollow(id)
        .then(response =>{  
        if(response.data.resultCode === 0){ 
            dispatch(followAC(id))           
        }  
        dispatch(toggleFollowingInProgress(false, null))
    }) ;
    }
}



export default usersReducer