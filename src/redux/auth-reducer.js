
import { authAPI, securityAPI } from "../api/api" 
const defaultValue = 'auth'
  
let SET_USER_DATA = defaultValue+ 'SET_USER_DATA' 
let  ERROR_MESSAGE =defaultValue+ 'ERROR_MESSAGE'
let GET_CAPTCHA = defaultValue +'GET_CAPTCHA' 

let initialState = { 
    email: null,    
    userId: null,   
    login: null,
    isAuth: false, 
    error : '',  
    captchaUrl: null

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
        case GET_CAPTCHA: { 
            return{...state,captchaUrl:action.url}
        }
        default: 
        return state
    }
}  
export const errorAC = (error) => ({type: ERROR_MESSAGE, error})   
export const setUserDataAC= (userId, email, login, isAuth) => ({type: SET_USER_DATA, data:{userId,email,login, isAuth}}) 
const getCaptchaUrlAC = (url) =>({type:GET_CAPTCHA, url}) 
export const loginThunkCreator = () => async(dispatch) =>{ 
    //getAuthUserData 
    let response = await authAPI.me()
    if(response.data.resultCode === 0){        
        let {id,email,login} = response.data.data         
        dispatch(setUserDataAC(id,email,login, true))
    }; 
}
export const loginTC = (email, password,rememberMe, setError, captcha = null) =>async(dispatch) =>{ 
        let response = await authAPI.authLogin(email, password, rememberMe,captcha) 
        if(response.data.resultCode === 0){ 
            dispatch(loginThunkCreator())
        }else{   
            if(response.data.resultCode === 10){  
                dispatch(getCaptchaUrl())
            } 
            setError("server", {
            type: "custom",
            message: response.data.messages
        });
        }
} 
export const getCaptchaUrl = () => async(dispatch) =>{ 
    let response = await securityAPI.getCaptcha() 
    debugger
    dispatch(getCaptchaUrlAC(response.data.url))
    }
export const logoutTC = () => async(dispatch) =>{ 
        let response = await authAPI.authLogout() 
        if(response.data.resultCode === 0){ 
         dispatch(setUserDataAC(null, null,null, false))
        } 
    }

export default authreducer