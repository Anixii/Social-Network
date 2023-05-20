import { createSelector } from "reselect"

export const getUsers = (state) =>{ 
    return state.usersPage.users
}  
export const getPageSize = (state) =>{ 
    return state.usersPage.pageSize
} 
export const getTotalUserCount = (state) =>{ 
    return state.usersPage.totalUsers 
} 
export const getCurrentPage = (state) =>{ 
    return state.usersPage.currentPage
} 
export const getIsFollow = (state) =>{ 
    return state.usersPage.followingInProgress
} 
export const isFetching = (state) =>{ 
    return state.usersPage.isFetching
}
// just practise
export const getUsersSuperSelector = createSelector(getUsers,(users) =>{ 
    return users.filter(item => true)
})