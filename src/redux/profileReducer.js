const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'  
let initialState = { 
    myPostItem : [ 
        {id:1, message:'How are u?', likes: 1547,},  
        {id:2, message:'Whats up maan', likes: 147,},  
        {id:3, message:'dude', likes: 4547,},  
        {id:4, message:'bruh', likes: 17,}, 
    ], 
    newPostText: 'BSA',  
    
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
        default: 
         return state
    }
    
}  
export const addPostActionCreator = () =>{ 
    return{ 
        type: ADD_POST, 
    }
}
export const updateNewPostTextActionCreator =(text)=>{  
   
    return{ 
        type: UPDATE_NEW_POST_TEXT,
        arg: text,
    }
}  
export default profileReducer