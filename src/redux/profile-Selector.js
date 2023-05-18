export const getProfileSelector = (state) =>{ 
    return state.postPage.profile
}  
export const getStatusSelector = (state) =>{ 
    return state.postPage.status
}  
export const getUserIDSelector = (state) =>{ 
    return state.auth.userId
}  
export const getAuthSelector = (state) =>{ 
    return state.auth.isAuth
} 