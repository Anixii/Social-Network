import { Dispatch } from "react"
import { followAPI } from "../api/api"
import { userAPI } from "../api/api"
import { updateObjectInArr } from "../utils/helpers"
import { ThunkAction } from "redux-thunk"
import { AppStateType } from "./redux-store"

const FOLLOW = 'USER_PAGE_FOLLOW'
const CURRENT_PAGE = 'USER_PAGE_CURRENT-PAGE'
const UNFOLLOW = 'USER_PAGE_UNFOLLOW'
const SET_USERS = 'USER_PAGE_SET-USERS'
const TOTAL_COUNT = 'USER_PAGE_TOTAL-COUNT'
const TOGGLE_FETCHING = 'USER_PAGE_TOGGLE_FETCHING'
const TOGGLE_IS_FOLLOWING = 'USER_PAGE_TOGGLE_IS_FOLLOWING'
type PhotoType = {
    small: string | null
    large: string | null
}
export type UserActionType = {
    id: number
    name: string
    status: string | null
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
                users: updateObjectInArr(state.users, action.userId, 'id', { followed: true })
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
type AllActionType = FollowType | UnFollowType | SetUserType | GetCurrentPageType | toggleFollowingInProgressType | ToggleFetchingType | SetTotalCountType
type FollowType = {
    type: typeof FOLLOW
    userId: number
}
export const followAC = (userId: number): FollowType => ({ type: FOLLOW, userId, })
type UnFollowType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowAC = (userId: number): UnFollowType => ({ type: UNFOLLOW, userId })
type SetUserType = {
    type: typeof SET_USERS
    users: Array<UserActionType>
}
export const setUsersAC = (users: Array<UserActionType>): SetUserType => ({ type: SET_USERS, users })
type GetCurrentPageType = {
    type: typeof CURRENT_PAGE
    currentPage: number
}
export const getCurrentPageAC = (currentPage: number): GetCurrentPageType => ({ type: CURRENT_PAGE, currentPage })

type SetTotalCountType = {
    type: typeof TOTAL_COUNT
    totalCount: number
}
export const setTotalCountAC = (totalCount: number): SetTotalCountType => ({ type: TOTAL_COUNT, totalCount })
type ToggleFetchingType = {
    type: typeof TOGGLE_FETCHING
    isFetching: boolean
}
export const toggleFetching = (isFetching: boolean): ToggleFetchingType => ({ type: TOGGLE_FETCHING, isFetching })
type toggleFollowingInProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFollowing: boolean
    userId: number
}
export const toggleFollowingInProgress = (isFollowing: boolean, userId: number): toggleFollowingInProgressType => ({ type: TOGGLE_IS_FOLLOWING, isFollowing, userId })


//Thunk-Creators 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AllActionType>
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<AllActionType>) => {
    dispatch(getCurrentPageAC(currentPage));
    dispatch(toggleFetching(true))
    let response = await userAPI.getUsers(currentPage, pageSize)
    dispatch(setUsersAC(response.items))
    dispatch(setTotalCountAC(response.totalCount))
    dispatch(toggleFetching(false))
}
const _followUnfollowFlow = async (dispatch: Dispatch<AllActionType>, userId: number, apiMethod: Function, AC: (userId:number) => FollowType | UnFollowType) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(AC(userId))
    }
    dispatch(toggleFollowingInProgress(false, 0))
}
export const unfollowThunk = (id: number): ThunkType => async (dispatch) => {
    _followUnfollowFlow(dispatch, id, followAPI.unFollow.bind(followAPI), unfollowAC)
}
export const followThunk = (id: number) => async (dispatch: Dispatch<AllActionType>) => {
    _followUnfollowFlow(dispatch, id, followAPI.onFollow.bind(followAPI), followAC)
}
export default usersReducer