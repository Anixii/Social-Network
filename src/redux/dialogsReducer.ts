const ADD_MESSAGE = 'ADD-MESSAGE'  
type dialogItemType = { 
    id: number, 
    name: string
} 
type MessageItemType = { 
    message: string
}
let initialState = { 
    dialogItem : [ 
        {id:1,name: 'Yusf'}, 
        {id:2,name: 'Aza'}, 
        {id:3,name: 'Alexey'}, 
        {id:4,name: 'Beka'},
    ] as Array<dialogItemType>,   
    messageItem :[ 
        {message:'What up'}, 
        {message:'Wow'}
    ] as Array<MessageItemType> ,     
} 
type initialStateType = typeof initialState
const dialogsReducer = (state = initialState, action:AddMessageType):initialStateType =>{ 
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
type AddMessageType = { 
    type: typeof ADD_MESSAGE 
    text: string
}
export const addMessageActionCreator=(text:string):AddMessageType=>({type: ADD_MESSAGE,text})  
export default dialogsReducer