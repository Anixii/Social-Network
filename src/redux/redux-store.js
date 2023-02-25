import {combineReducers,  legacy_createStore as createStore} from 'redux'

import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"
import usersReducer from './usersReducer'


let reducers = combineReducers({  
    postPage:profileReducer ,
    dialogPage:dialogsReducer, 
    usersPage: usersReducer
})
let store = createStore(reducers)  

export default store