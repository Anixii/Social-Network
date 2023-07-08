import { ThunkAction } from "redux-thunk"
import { ProfileAPI } from "../api/profile-api"
import { AppStateType, InferActionTypes } from "./redux-store"
import { Nullable } from "../types/types"
const ADD_POST = 'ADD-POST'

const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const SAVE_PHOTO = 'SAVE_PHOTO'
export type PostItemType = {
  id: number,
  message: string
  likes: number
}
export type ContactType = {
  vk: Nullable<string>
  facebook: Nullable<string>
  instagram: Nullable<string>
  github: Nullable<string>
  twitter: Nullable<string>
  website: Nullable<string>
  youtube: Nullable<string>
  mainLink: Nullable<string>
}
export type PhotoType = {
  small: Nullable<string>
  large: Nullable<string>
}
export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactType
  photos: PhotoType
}
let initialState = {
  myPostItem: [
    { id: 1, message: 'How are u?', likes: 1547, },
    { id: 2, message: 'Whats up maan', likes: 147, },
    { id: 3, message: 'dude', likes: 4547, },
    { id: 4, message: 'bruh', likes: 17, },
  ] as Array<PostItemType>,
  profile: null as ProfileType | null,
  status: '' as string

}
type InitialStateType = typeof initialState
const profileReducer = (state = initialState, action: AllActionCreatorsType): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.text,
        likes: 0
      }
      return {
        ...state,
        myPostItem: [...state.myPostItem, newPost]
      }
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile }
    }
    case SET_STATUS: {
      return { ...state, status: action.status }
    }
    case SAVE_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.data } as ProfileType
      }
    }
    default:
      return state
  }
}
//Action Creators
type AllActionCreatorsType = InferActionTypes<typeof actions>

export const actions = {
  addPostActionCreator : (text: string) => ({ type: ADD_POST, text } as const),
  setUsersProfile : (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
  setStatus : (status: string) => ({ type: SET_STATUS, status } as const),
  savePhotoAC : (data: PhotoType) => ({ type: SAVE_PHOTO, data } as const),
}

//Thunks 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AllActionCreatorsType>
export const getUsersProfileThunkC = (userId: number | null): ThunkType => async (dispatch) => {
  try {
    const response = await ProfileAPI.getProfile(userId);
    dispatch(actions.setUsersProfile(response));
  } catch (error) {
    console.log("Error getting user profile: ", error);
  }
};
export const getStatusThunkC = (userId: number): ThunkType => async (dispatch) => {
  try {
    const response = await ProfileAPI.getStatus(userId);
    dispatch(actions.setStatus(response.data));
  } catch (error) {
    console.log("Error getting user status: ", error);
  }
};
export const updateStatusThunkC = (status: string): ThunkType => async (dispatch) => {
  try {
    const response = await ProfileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    console.log("Error updating user status: ", error);
  }
};
export const savePhotoTC = (photos: any): ThunkType => async (dispatch) => {
  const response = await ProfileAPI.savePhoto(photos)
  if (response.data.resultCode === 0) {
    dispatch(actions.savePhotoAC(response.data.data.photos))
  }
}
type GetStateType = () => AppStateType
export const saveProfileTC = (data: ProfileType): ThunkType => async (dispatch, getState: GetStateType) => {
  const response = await ProfileAPI.saveProfile(data)
  if (response.data.resultCode === 0) {
    dispatch(getUsersProfileThunkC(getState().auth.userId))
  }
}


export default profileReducer