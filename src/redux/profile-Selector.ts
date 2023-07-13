import { AppStateType } from "./redux-store"

export const getProfileSelector = (state:AppStateType) =>{ 
    return state.postPage.profile
}
export const getStatusSelector = (state:AppStateType) =>{ 
    return state.postPage.status
}  
export const getUserIDSelector = (state:AppStateType) =>{ 
    return state.auth.userId
}  
export const getAuthSelector = (state:AppStateType) =>{ 
    return state.auth.isAuth
} 