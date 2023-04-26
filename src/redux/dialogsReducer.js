const ADD_MESSAGE = 'ADD-MESSAGE'
let initialState = { 
    dialogItem : [ 
        {id:1,name: 'Yusf'}, 
        {id:2,name: 'Aza'}, 
        {id:3,name: 'Alexey'}, 
        {id:4,name: 'Beka'},
    ],   
    messageItem :[ 
        {message:'What up'}, 
        {message:'Wow'}
    ] ,  
    
    
}
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT'
const dialogsReducer = (state = initialState, action) =>{ 
     switch(action.type){   
        
    //     case ADD_MESSAGE: { 
    //     let newMessage = state.newMessageText 
    //     return { 
    //         ...state, 
    //         newMessageText : '', 
    //         messageItem:[...state.messageItem, {message : newMessage}]
    //     };    } flux круговорот, когда то был 
    case ADD_MESSAGE :{ 
        return { 
            ...state, 
            messageItem: [...state.messageItem, {message: action.text}]
        }
    }
        // case UPDATE_NEW_MESSAGE_TEXT:{  
        // return{ 
        //     ...state, 
        //     newMessageText: action.arg
        // } 
         //}
        default: return state
    } 

    
}  
export const addMessageActionCreator=(text)=>{
    return{ 
       type: ADD_MESSAGE, 
       text
    }
}  

export const updateNewMessageActionCreator=(text) =>{ 
   return{ 
       type: UPDATE_NEW_MESSAGE_TEXT, 
       arg: text
   }
}
export default dialogsReducer