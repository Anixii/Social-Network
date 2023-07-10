import { Dispatch } from "react"
import { userAPI } from "../api/users-api"
import { updateObjectInArr } from "../utils/helpers"
import { InferActionTypes, ThunkActionsType } from "./redux-store"
import { Nullable } from "../types/types"
import { ResponseType, ResultCodesEnum } from "../api/api"

const FOLLOW = 'USER_PAGE_FOLLOW'
const CURRENT_PAGE = 'USER_PAGE_CURRENT-PAGE'
const UNFOLLOW = 'USER_PAGE_UNFOLLOW'
const SET_USERS = 'USER_PAGE_SET-USERS'
const TOTAL_COUNT = 'USER_PAGE_TOTAL-COUNT'
const TOGGLE_FETCHING = 'USER_PAGE_TOGGLE_FETCHING'  
const SET_FILTER = 'USER_PAGE_SET_FILTER'
const TOGGLE_IS_FOLLOWING = 'USER_PAGE_TOGGLE_IS_FOLLOWING'
type PhotoType = {
    small: Nullable<string>
    large: Nullable<string>
} 

export type UserActionType = {
    id: number 
    name: string
    status: Nullable<string>
    photos: PhotoType
    followed: boolean
}
let initialState = {
    users: [] as Array<UserActionType>,
    pageSize: 15,
    totalUsers: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: {
        isFollowing: false,
        userId: null as number | null
    },  
    filter: { 
        term:'', 
        friend: null as boolean | null
    }
} 
export type FilterUserType = typeof initialState.filter
export type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: AllActionType): InitialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArr(state.users, action.userId, 'id', { followed: true }), 
                
            }
        case UNFOLLOW: {

            return {
                ...state,
                users: updateObjectInArr(state.users, action.userId, 'id', { followed: false })
            }
        }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case TOTAL_COUNT: {
            return {
                ...state,
                totalUsers: action.totalCount
            }
        }
        case TOGGLE_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        } 
        case SET_FILTER: { 
            return{ 
                ...state, 
                filter: action.payload
            }
        }
        case TOGGLE_IS_FOLLOWING: {

            return {
                ...state,
                followingInProgress: {
                    ...state.followingInProgress,
                    isFollowing: action.isFollowing,
                    userId: action.userId
                }
            };
        }
        default:

            return state
    }

}  
type AllActionType = InferActionTypes<typeof actions>
export const actions = { 
    followAC: (userId: number|null) => ({ type: FOLLOW, userId, } as const),
    unfollowAC : (userId: number|null) => ({ type: UNFOLLOW, userId } as const),
    setUsersAC : (users: Array<UserActionType>) => ({ type: SET_USERS, users } as const),
    getCurrentPageAC : (currentPage: number) => ({ type: CURRENT_PAGE, currentPage } as const), 
    setFilterAC: (filter: FilterUserType) =>({type:SET_FILTER ,payload:filter} as const),
    setTotalCountAC : (totalCount: number)=> ({ type: TOTAL_COUNT, totalCount } as const),
    toggleFetching : (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
    toggleFollowingInProgress:(isFollowing: boolean, userId: number|null)=> ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId } as const)
}


//Thunk-Creators 
type ThunkType = ThunkActionsType<AllActionType>
export const getUsersThunkCreator = (currentPage: number, pageSize: number, filter:FilterUserType) => async (dispatch: Dispatch<AllActionType>) => {
    dispatch(actions.getCurrentPageAC(currentPage));
    dispatch(actions.toggleFetching(true)) 
    dispatch(actions.setFilterAC(filter))
    
    let response = await userAPI.getUsers(currentPage, pageSize,filter.term, filter.friend)
    dispatch(actions.setUsersAC(response.items))
    dispatch(actions.setTotalCountAC(response.totalCount))
    dispatch(actions.toggleFetching(false))
}   

const _followUnfollowFlow = async (dispatch: Dispatch<AllActionType>, userId: number|null, 
    apiMethod: (userId: number | null) => Promise<ResponseType>,  AC: (userId:number|null) => AllActionType) => {
     
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)   
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(AC(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, null))
}
export const unfollowThunk = (id: number|null): ThunkType => async (dispatch) => { 
    let apiMethodFollow = userAPI.unFollow.bind(userAPI)
   await _followUnfollowFlow(dispatch, id, apiMethodFollow, actions.unfollowAC)
}
export const followThunk = (id: number|null):ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, userAPI.onFollow.bind(userAPI), actions.followAC)
}
export default usersReducer