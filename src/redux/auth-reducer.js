let SET_USER_DATA = 'SET_USER_DATA' 
 
 
let initialState = { 

    email: null,    
    userId: null,   
    login: null,
    isAuth: false
}  
 const authreducer= (state = initialState, action) =>{ 

    switch(action.type){ 
        case SET_USER_DATA: 
        console.log(action.data) 
        return {...state, ...action.data, isAuth : true}  
        default: 
        return state
    }
} 
export const setUserDataAC= (userId, email, login) => ({type: SET_USER_DATA, data:{userId,email,login}}) 
export default authreducer