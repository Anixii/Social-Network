import {applyMiddleware, combineReducers,  legacy_createStore as createStore} from 'redux'

import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"
import usersReducer from './usersReducer'
import authreducer from './auth-reducer'
import thunk from 'redux-thunk'

let reducers = combineReducers({  
    postPage:profileReducer ,
    dialogPage:dialogsReducer, 
    usersPage: usersReducer, 
    auth: authreducer, 
})
let store = createStore(reducers, applyMiddleware(thunk))  

export default store