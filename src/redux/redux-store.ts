import {Action, applyMiddleware, combineReducers,  legacy_createStore as createStore} from 'redux'

import dialogsReducer from "./dialogsReducer"
import { AnyAction } from "redux";
import profileReducer from "./profileReducer"
import usersReducer from './usersReducer'
import authreducer from './auth-reducer'
import thunk, { ThunkAction,ThunkDispatch  } from 'redux-thunk'
import appReducer from './app-reducer'
import { useDispatch } from 'react-redux';
let reducers = combineReducers({  
    postPage:profileReducer ,
    dialogPage:dialogsReducer, 
    usersPage: usersReducer, 
    auth: authreducer,  
    app: appReducer
}) 
let store = createStore(reducers, applyMiddleware(thunk))   
type RootReducerType = typeof reducers  
type RootDispatcher = ReturnType<typeof store.dispatch>;
export type AppStateType = ReturnType<RootReducerType> 
export type InferActionTypes<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never

export type ThunkActionsType<A extends Action, R = Promise<void>, > = ThunkAction<R, AppStateType, unknown, A> 
 
export type AppDispatch = ThunkDispatch<AppStateType, any, AnyAction>;  
export const useAsyncDispatch = () => useDispatch<ThunkDispatch<AppStateType, void, RootDispatcher>>();

//@ts-ignore
window.store= store
export default store