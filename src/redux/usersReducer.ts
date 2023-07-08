import { Dispatch } from "react"
import { followAPI } from "../api/api"
import { userAPI } from "../api/api"
import { updateObjectInArr } from "../utils/helpers"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionTypes } from "./redux-store"
import { Nullable } from "../types/types"

const FOLLOW = 'USER_PAGE_FOLLOW'
const CURRENT_PAGE = 'USER_PAGE_CURRENT-PAGE'
const UNFOLLOW = 'USER_PAGE_UNFOLLOW'
const SET_USERS = 'USER_PAGE_SET-USERS'
const TOTAL_COUNT = 'USER_PAGE_TOTAL-COUNT'
const TOGGLE_FETCHING = 'USER_PAGE_TOGGLE_FETCHING'
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
        userId: 0
    }
}
type InitialStateType = typeof initialState
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
    followAC: (userId: number) => ({ type: FOLLOW, userId, } as const),
    unfollowAC : (userId: number) => ({ type: UNFOLLOW, userId } as const),
    setUsersAC : (users: Array<UserActionType>) => ({ type: SET_USERS, users } as const),
    getCurrentPageAC : (currentPage: number) => ({ type: CURRENT_PAGE, currentPage } as const),
    setTotalCountAC : (totalCount: number)=> ({ type: TOTAL_COUNT, totalCount } as const),
    toggleFetching : (isFetching: boolean) => ({ type: TOGGLE_FETCHING, isFetching } as const),
    toggleFollowingInProgress:(isFollowing: boolean, userId: number)=> ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId } as const)
}


//Thunk-Creators 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AllActionType>
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<AllActionType>) => {
    dispatch(actions.getCurrentPageAC(currentPage));
    dispatch(actions.toggleFetching(true))
    let response = await userAPI.getUsers(currentPage, pageSize)
    dispatch(actions.setUsersAC(response.items))
    dispatch(actions.setTotalCountAC(response.totalCount))
    dispatch(actions.toggleFetching(false))
}
const _followUnfollowFlow = async (dispatch: Dispatch<AllActionType>, userId: number, apiMethod: Function, AC: (userId:number) => AllActionType) => {
    dispatch(actions.toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(AC(userId))
    }
    dispatch(actions.toggleFollowingInProgress(false, 0))
}
export const unfollowThunk = (id: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, id, followAPI.unFollow.bind(followAPI), actions.unfollowAC)
}
export const followThunk = (id: number) => async (dispatch: Dispatch<AllActionType>) => {
    _followUnfollowFlow(dispatch, id, followAPI.onFollow.bind(followAPI), actions.followAC)
}
export default usersReducer