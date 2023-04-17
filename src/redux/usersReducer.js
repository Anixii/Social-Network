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
    followingInProgress : [],
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
            
            return{ 
                ...state, 
                followingInProgress: action.isFetching 
                ?  [...state.followingInProgress, action.userId] 
                :  state.followingInProgress.filter(id => id !== action.userId)
            }
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
export const toggleFollowingInProgress = (followingInProgress,userId) => ({type: TOGGLE_IS_FOLLOWING, followingInProgress, userId})
export default usersReducer