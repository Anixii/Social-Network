import { authAPI } from "../api/api" 
 
 
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
        return {...state, ...action.data}  
        default: 
        return state
    }
} 
export const setUserDataAC= (userId, email, login, isAuth) => ({type: SET_USER_DATA, data:{userId,email,login, isAuth}}) 
 
export const loginThunkCreator = () =>{ 
    //getAuthUserData 
    return (dispatch) =>{ 
         authAPI.me() 
           .then(response =>{   
                if(response.data.resultCode === 0){ 
                    let {id,email,login} = response.data.data
                    dispatch(setUserDataAC(id,email,login, true))
                    //можно стянуть аву
                }}) ;
    }
}
export const loginTC = (email, password,rememberMe) =>{  
    return (dispatch) =>{ 
        authAPI.authLogin(email, password, rememberMe) 
            .then(response =>{ 
                if(response.data.resultCode === 0){ 
                    dispatch(loginThunkCreator())
                }
            })
    }
} 
export const logoutTC = () =>{  
    return (dispatch) =>{ 
        authAPI.authLogout() 
            .then(response =>{ 
                if(response.data.resultCode === 0){ 
                    dispatch(setUserDataAC(null, null,null, false))
                }
            })
    }
}
export default authreducer