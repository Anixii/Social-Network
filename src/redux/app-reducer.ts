import { ThunkAction } from "redux-thunk"
import { loginThunkCreator } from "./auth-reducer"  
import { AppStateType, InferActionTypes } from "./redux-store"
const SET_INITIALIZED = 'SET_INITIALIZED' 

const initialState={ 
    initialized : false
 }  
const actions = { 
    initializedSuccess:()=>({type: SET_INITIALIZED} as const)
}
type InitialStateType = typeof initialState 
type ActionTypes = InferActionTypes<typeof actions>
const appReducer = (state = initialState, action:ActionTypes):InitialStateType =>{ 
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
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes> 


 
export const initializeTC = () =>(dispatch:any) =>{ 
    let result =  dispatch(loginThunkCreator())
    result.then(() =>{ 
        dispatch(actions.initializedSuccess())
    }) 
}
export default appReducer