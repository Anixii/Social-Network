import {Action, applyMiddleware, combineReducers,  legacy_createStore as createStore} from 'redux'

import dialogsReducer from "./dialogsReducer"
import { AnyAction } from "redux";
import profileReducer from "./profileReducer"
import usersReducer from './usersReducer'
import authreducer from './auth-reducer'
import thunk, { ThunkAction,ThunkDispatch  } from 'redux-thunk'
import appReducer from './app-reducer'
let reducers = combineReducers({  
    postPage:profileReducer ,
    dialogPage:dialogsReducer, 
    usersPage: usersReducer, 
    auth: authreducer,  
    app: appReducer
}) 
let store = createStore(reducers, applyMiddleware(thunk))   
type RootReducerType = typeof reducers 
export type AppStateType = ReturnType<RootReducerType> 
export type InferActionTypes<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never

export type ThunkActionsType<A extends Action, R = Promise<void>, > = ThunkAction<R, AppStateType, unknown, A> 
 
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;  
export type RootState = ReturnType<typeof reducers>;

//@ts-ignore
window.store= store
export default store