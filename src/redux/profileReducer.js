import { authAPI } from "../api/api"
 const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'  
const SET_USER_PROFILE = 'SET_USER_PROFILE' 

let initialState = { 
    myPostItem : [ 
        {id:1, message:'How are u?', likes: 1547,},  
        {id:2, message:'Whats up maan', likes: 147,},  
        {id:3, message:'dude', likes: 4547,},  
        {id:4, message:'bruh', likes: 17,}, 
    ], 
    newPostText: 'BSA',  
    profile: null 
    
}
const profileReducer = (state = initialState, action) =>{ 
    
    switch(action.type){  
        
        case ADD_POST: {
        let newPost = { 
            id:5, 
            message: state.newPostText , 
            likes: 0
        } 
        let copyState = {...state}; 
        copyState.myPostItem = [...state.myPostItem] 
        copyState.myPostItem.push(newPost)  
        
        copyState.newPostText = '' 
        return copyState 
    }
        case UPDATE_NEW_POST_TEXT: {
        let copyState = {...state}
        copyState.newPostText = action.arg  
        return copyState; 
        }  
        case SET_USER_PROFILE: { 
            return {...state, profile: action.profile}
        }
        default: 
         return state
    }
    
}  
export const addPostActionCreator = () =>{ 
    return{ 
        type: ADD_POST, 
    }
} 
export const setUsersProfile = (profile) => ({type: SET_USER_PROFILE, profile })
export const updateNewPostTextActionCreator =(text)=>{  
   
    return{ 
        type: UPDATE_NEW_POST_TEXT,
        arg: text,
    }
}    


export const getUsersProfileThunkC =(userId) =>{ 
    return (dispatch) => {  
        if(!userId){ 
            userId= 28741
        }
       authAPI.getProfile(userId)
        .then(response =>{   
        dispatch(setUsersProfile(response.data)) 
       
    }) ;
    }
}


export default profileReducer