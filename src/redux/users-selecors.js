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