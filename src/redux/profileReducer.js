import { ProfileAPI} from "../api/api"
 const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'  
const SET_USER_PROFILE = 'SET_USER_PROFILE' 
const SET_STATUS = 'SET_STATUS'
let initialState = { 
    myPostItem : [ 
        {id:1, message:'How are u?', likes: 1547,},  
        {id:2, message:'Whats up maan', likes: 147,},  
        {id:3, message:'dude', likes: 4547,},  
        {id:4, message:'bruh', likes: 17,}, 
    ],   
    profile: null , 
    status: ''
    
}
const profileReducer = (state = initialState, action) =>{ 
    
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
        case UPDATE_NEW_POST_TEXT: {
        let copyState = {...state}
        copyState.newPostText = action.arg  
        return copyState; 
        }  
        case SET_USER_PROFILE: { 
            return {...state, profile: action.profile}
        } 
        case SET_STATUS : { 
            return {...state, status :action.status}
        }
        default: 
         return state
    }
    
}  
export const addPostActionCreator = (text) =>{ 
    return{ 
        type: ADD_POST, text
    }
} 
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile })
export const setStatus    = (status) => ({type: SET_STATUS, status})


export const getUsersProfileThunkC = (userId) => async (dispatch) => {
      try {
        const response = await ProfileAPI.getProfile(userId);
        dispatch(setUsersProfile(response.data));
      } catch (error) {
        console.log("Error getting user profile: ", error);
      } 
    };
  export const getStatusThunkC = (userId) => async (dispatch) => {
      try {
        const response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
      } catch (error) {
        console.log("Error getting user status: ", error);
      }
    };
  export const updateStatusThunkC = (status) => async (dispatch) => {
      try {
        const response = await ProfileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
          dispatch(setStatus(status));
        }
      } catch (error) {
        console.log("Error updating user status: ", error);
      }
    };
  
  

export default profileReducer