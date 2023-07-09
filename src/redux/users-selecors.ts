
import { AppStateType } from "./redux-store"

export const getUsers = (state:AppStateType) =>{ 
    return state.usersPage.users
}  
export const getPageSize = (state:AppStateType) =>{ 
    return state.usersPage.pageSize
} 
export const getTotalUserCount = (state:AppStateType) =>{ 
    return state.usersPage.totalUsers 
} 
export const getCurrentPage = (state:AppStateType) =>{ 
    return state.usersPage.currentPage
} 
export const getIsFollow = (state:AppStateType) =>{ 
    return state.usersPage.followingInProgress
} 
export const isFetching = (state:AppStateType) =>{ 
    return state.usersPage.isFetching
}
// just practise
