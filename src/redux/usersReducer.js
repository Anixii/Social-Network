import { followAPI } from "../api/api"
import { userAPI} from "../api/api"  
import { updateObjectInArr } from "../utils/helpers"
const FOLLOW = 'FOLLOW'
const CURRENT_PAGE = 'CURRENT-PAGE'
const UNFOLLOW = 'UNFOLLOW'  
const SET_USERS = 'SET-USERS'  
const TOTAL_COUNT = 'TOTAL-COUNT' 
const TOGGLE_FETCHING = 'TOGGLE_FETCHING' 
const TOGGLE_IS_FOLLOWING ='TOGGLE_IS_FOLLOWING'
 

let initialState = { 
    users:[], 
    pageSize:15, 
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
                users:  updateObjectInArr(state.users, action.userId, 'id', {followed:true})
            }
        case UNFOLLOW:{   
       
        return{ 
            ...state, 
            users:  updateObjectInArr(state.users, action.userId, 'id', {followed: false})
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
//Action Creators
export const followAC = (userId) =>({type: FOLLOW,userId,}) 
export const unfollowAC = (userId) =>({ type: UNFOLLOW, userId})
export const setUsersAC = (users) =>({type: SET_USERS, users}) 
export const getCurrentPageAC = (currentPage) => ({type: CURRENT_PAGE, currentPage})
export const setTotalCountAC = (totalCount) =>({type:TOTAL_COUNT, totalCount})    
export const toggleFetching = (isFetching) =>({type:TOGGLE_FETCHING, isFetching})   
export const toggleFollowingInProgress = (isFollowing,userId) => ({type: TOGGLE_IS_FOLLOWING, isFollowing, userId})
//Thunk-Creators
export const getUsersThunkCreator = (currentPage,pageSize) =>async (dispatch) =>{ 
    dispatch(getCurrentPageAC(currentPage)); 
    dispatch(toggleFetching(true)) 
let response = await userAPI.getUsers(currentPage, pageSize) 
dispatch(setUsersAC(response.items)) 
dispatch(setTotalCountAC(response.totalCount))   
dispatch(toggleFetching(false))
}  
const followUnfollowFlow = async (dispatch, userId,apiMethod, AC) =>{ 
    dispatch(toggleFollowingInProgress(true, userId)) 
    let response = await apiMethod(userId) 
    if(response.data.resultCode === 0){ 
        dispatch(AC(userId))           
    }  
    dispatch(toggleFollowingInProgress(false, null))
}   
export const unfollowThunk = (id) => async(dispatch) => { 
   followUnfollowFlow(dispatch, id, followAPI.unFollow.bind(followAPI), unfollowAC )
}
export const followThunk = (id) => async(dispatch) => { 
    followUnfollowFlow(dispatch, id, followAPI.onFollow.bind(followAPI), followAC )
}
export default usersReducer