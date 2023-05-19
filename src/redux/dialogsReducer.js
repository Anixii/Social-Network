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
const dialogsReducer = (state = initialState, action) =>{ 
    switch(action.type){   
    case ADD_MESSAGE :{ 
        return { 
            ...state, 
            messageItem: [...state.messageItem, {message: action.text}]
        }
    }
        default: return state
    } 
}  
export const addMessageActionCreator=(text)=>({type: ADD_MESSAGE,text})  
export default dialogsReducer