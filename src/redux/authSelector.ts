import { AppStateType } from "./redux-store"

export const isUserAuth = (state:AppStateType) =>{ 
    return state.auth.isAuth
} 
export const isUserLoggined = (state:AppStateType) =>{ 
    return state.auth.login
}