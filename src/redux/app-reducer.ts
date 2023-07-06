import { ThunkAction } from "redux-thunk"
import { loginThunkCreator } from "./auth-reducer"  
import { AppStateType } from "./redux-store"
const SET_INITIALIZED = 'SET_INITIALIZED' 
type initialStateType = { 
    initialized: boolean
}
const initialState:initialStateType ={ 
    initialized : false
 }
 const appReducer = (state = initialState, action:initializedSuccessActionType):initialStateType =>{ 
    switch (action.type){ 
        case SET_INITIALIZED: { 
            return{ 
                ...state, 
                initialized: true, 
            }
        } 
        default : 
        return state
    }
}   
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, initializedSuccessActionType>
type initializedSuccessActionType = { 
    type: typeof SET_INITIALIZED
}
export const initializedSuccess = ():initializedSuccessActionType =>({type: SET_INITIALIZED})
 
export const initializeTC = () =>(dispatch:any) =>{ 
    let result =  dispatch(loginThunkCreator())
    result.then(() =>{ 
        dispatch(initializedSuccess())
    }) 
}
export default appReducer