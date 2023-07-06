import { ThunkAction } from "redux-thunk"
import { ProfileAPI} from "../api/api"
import { AppStateType } from "./redux-store"
 const ADD_POST = 'ADD-POST'
  
const SET_USER_PROFILE = 'SET_USER_PROFILE' 
const SET_STATUS = 'SET_STATUS' 
const SAVE_PHOTO = 'SAVE_PHOTO' 
type PostItemType = { 
  id: number, 
  message: string 
  likes: number
}  
type ContactType = { 
  vk: string | null 
  facebook:string | null 
  instagram: string | null 
  github: string | null 
  twitter: string | null 
  website: string | null 
  youtube: string | null 
  mainLink:string | null
} 
type PhotoType = { 
  small: string | null 
  large: string | null
}
type ProfileType = { 
  userId: number 
  lookingForAJob: boolean 
  lookingForAJobDescription: string 
  fullName: string 
  contacts: ContactType 
  photos: PhotoType
}
let initialState = { 
    myPostItem : [ 
        {id:1, message:'How are u?', likes: 1547,},  
        {id:2, message:'Whats up maan', likes: 147,},  
        {id:3, message:'dude', likes: 4547,},  
        {id:4, message:'bruh', likes: 17,}, 
    ] as Array<PostItemType> ,   
    profile: null as ProfileType | null, 
    status: '' as string
    
} 
type InitialStateType = typeof initialState 
const profileReducer = (state = initialState, action:AllActionCreatorsType):InitialStateType =>{ 
    switch(action.type){  
        case ADD_POST: {
        let newPost = { 
            id:5, 
            message: action.text , 
            likes: 0
        } 
        return { 
            ...state, 
            myPostItem: [...state.myPostItem, newPost]
        }
    }
        case SET_USER_PROFILE: { 
            return {...state, profile: action.profile}
        } 
        case SET_STATUS : { 
            return {...state, status :action.status}
        } 
        case SAVE_PHOTO:{ 
          return{ 
            ...state, 
            profile: {...state.profile, photos : action.data} as ProfileType
          }
        }
        default: 
         return state
    } 
}     
//Action Creators
type AllActionCreatorsType = ActionCreatorType | setUsersProfileType | SetStatus | savePhotoType
type ActionCreatorType = { 
  type: typeof ADD_POST 
  text: string
}
export const addPostActionCreator = (text:string):ActionCreatorType =>({type: ADD_POST, text})
type setUsersProfileType =  { 
  type: typeof SET_USER_PROFILE 
  profile: ProfileType
} 
export const setUsersProfile = (profile:ProfileType):setUsersProfileType => ({type: SET_USER_PROFILE, profile })
type SetStatus = { 
  type: typeof SET_STATUS 
  status: string
} 
export const setStatus    = (status:string):SetStatus => ({type: SET_STATUS, status}) 
type savePhotoType = { 
  type: typeof SAVE_PHOTO 
  data: PhotoType
}
const savePhotoAC = (data:PhotoType):savePhotoType => ({type: SAVE_PHOTO, data})
 
//Thunks 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AllActionCreatorsType>
export const getUsersProfileThunkC = (userId:number | null):ThunkType => async (dispatch) => {
      try {
        const response = await ProfileAPI.getProfile(userId);
        dispatch(setUsersProfile(response.data));
      } catch (error) {
        console.log("Error getting user profile: ", error);
      } 
    };
export const getStatusThunkC = (userId:number):ThunkType => async (dispatch) => {
      try {
        const response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
      } catch (error) {
        console.log("Error getting user status: ", error);
      }
    };
export const updateStatusThunkC = (status:string):ThunkType => async (dispatch) => {
      try {
        const response = await ProfileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
          dispatch(setStatus(status));
        }
      } catch (error) {
        console.log("Error updating user status: ", error);
      }
    };
export const savePhotoTC = (photos:any):ThunkType => async(dispatch) =>{ 
    const response = await ProfileAPI.savePhoto(photos) 
    if (response.data.resultCode === 0) {
      dispatch(savePhotoAC(response.data.data.photos))
    }
}  
type GetStateType= () => AppStateType
export const saveProfileTC = (data:ProfileType):ThunkType => async(dispatch,getState: GetStateType) =>{  
  const response = await ProfileAPI.saveProfile(data) 
  debugger
  if (response.data.resultCode === 0) {
    dispatch(getUsersProfileThunkC(getState().auth.userId))
  }
} 
  

export default profileReducer