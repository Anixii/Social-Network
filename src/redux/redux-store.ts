import {Action, applyMiddleware, combineReducers,  legacy_createStore as createStore} from 'redux'

import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"
import usersReducer from './usersReducer'
import authreducer from './auth-reducer'
import thunk, { ThunkAction } from 'redux-thunk'
import appReducer from './app-reducer'
let reducers = combineReducers({  
    postPage:profileReducer ,
    dialogPage:dialogsReducer, 
    usersPage: usersReducer, 
    auth: authreducer,  
    app: appReducer
}) 
type RootReducerType = typeof reducers 
export type AppStateType = ReturnType<RootReducerType> 
type PropTypes<T> = T extends {[key:string]:infer U} ? U : never 
 
export type InferActionTypes<T extends {[key:string]: (...args: any[]) => any}> = ReturnType<PropTypes<T>> 
export type ThunkActionsType<A extends Action, R = Promise<void>, > = ThunkAction<R, AppStateType, unknown, A>
let store = createStore(reducers, applyMiddleware(thunk))  

export default store