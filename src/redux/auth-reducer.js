
import { authAPI } from "../api/api" 
const defaultValue = 'auth'
  
let SET_USER_DATA = defaultValue+ 'SET_USER_DATA' 
let  ERROR_MESSAGE =defaultValue+ 'ERROR_MESSAGE'
 
let initialState = { 
    email: null,    
    userId: null,   
    login: null,
    isAuth: false, 
    error : ''
}   

 const authreducer= (state = initialState, action) =>{ 

    switch(action.type){ 
        case SET_USER_DATA: 
        console.log(action.data) 
        return {...state, ...action.data}  
        case ERROR_MESSAGE: { 

            return {
                ...state,
                ...action.payload
            }
        }  
        default: 
        return state
    }
}  
export const errorAC = (error) => ({type: ERROR_MESSAGE, error})   
export const setUserDataAC= (userId, email, login, isAuth) => ({type: SET_USER_DATA, data:{userId,email,login, isAuth}}) 
 
export const loginThunkCreator = () => async(dispatch) =>{ 
    //getAuthUserData 
    let response = await authAPI.me()
    if(response.data.resultCode === 0){        
        let {id,email,login} = response.data.data         
        dispatch(setUserDataAC(id,email,login, true))
    }; 
}
export const loginTC = (email, password,rememberMe, setError) =>async(dispatch) =>{ 
        let response = await authAPI.authLogin(email, password, rememberMe) 
        if(response.data.resultCode === 0){ 
            dispatch(loginThunkCreator())
        } else {  
            setError("server", {
            type: "custom",
            message: response.data.messages
        });
        }
} 
export const logoutTC = () => async(dispatch) =>{ 
        let response = await authAPI.authLogout()  
        if(response.data.resultCode === 0){ 
         dispatch(setUserDataAC(null, null,null, false))
        } 
    }

export default authreducer