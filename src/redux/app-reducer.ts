import { loginThunkCreator } from "./auth-reducer"  
const SET_INITIALIZED = 'SET_INITIALIZED' 
type initialStateType = { 
    initialized: boolean
}
const initialState:initialStateType ={ 
    initialized : false
 }
 const appReducer = (state = initialState, action:any):initialStateType =>{ 
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
type initializedSuccessActionType = { 
    type: typeof SET_INITIALIZED
}
export const initializedSuccess = ():initializedSuccessActionType =>({type: SET_INITIALIZED})
 
export const initializeTC = () => (dispatch:any) =>{ 
    let result =  dispatch(loginThunkCreator())
    result.then(() =>{ 
        dispatch(initializedSuccess())
    }) 
}
export default appReducer