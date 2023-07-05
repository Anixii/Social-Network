
import { authAPI, securityAPI } from "../api/api"  
import { FieldErrors} from 'react-hook-form';
const defaultValue = 'auth'
  
let SET_USER_DATA = defaultValue+ 'SET_USER_DATA' 
let  ERROR_MESSAGE =defaultValue+ 'ERROR_MESSAGE'
let GET_CAPTCHA = defaultValue +'GET_CAPTCHA'  
type ErrorMessage = {
    type: string;
    message: string;
  };
export type initialStateType = { 
    email: null | string 
    userId:  number | null 
    login: null | string 
    isAuth: boolean 
    error: string 
    captchaUrl: null | string
}
let initialState: initialStateType = { 
    email: null,    
    userId: null,   
    login: null,
    isAuth: false, 
    error : '',  
    captchaUrl: null
}   

 const authreducer= (state = initialState, action: any):initialStateType =>{ 

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
type errorACType = { 
    type: typeof ERROR_MESSAGE  
    error: string
}
export const errorAC = (error:string):errorACType => ({type: ERROR_MESSAGE, error})    
 
type setUserDataActionType = { 
    type: typeof SET_USER_DATA 
    data:setUserDataActionPayloadType
} 
type setUserDataActionPayloadType = { 
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean | null
}
export const setUserDataAC= (userId:number | null, email:string| null, login:string| null, isAuth:boolean):setUserDataActionType => ({type: SET_USER_DATA, data:{userId,email,login, isAuth}}) 
  
type GetCaptchaUrlType = { 
    type: typeof GET_CAPTCHA 
    url:string
}
const getCaptchaUrlAC = (url: string):GetCaptchaUrlType =>({type:GET_CAPTCHA, url}) 
 
export const loginThunkCreator = () => async(dispatch:any) =>{ 
    //getAuthUserData 
    let response = await authAPI.me()
    if(response.data.resultCode === 0){        
        let {id,email,login} = response.data.data         
        dispatch(setUserDataAC(id,email,login, true))
    }; 
}
export const loginTC = (email:string, password:number,rememberMe:boolean, setError:Function, captcha = null) =>async(dispatch:any) =>{ 
        let response = await authAPI.authLogin(email, password, rememberMe,captcha) 
        if(response.data.resultCode === 0){ 
            dispatch(loginThunkCreator())
        }else{   
            if(response.data.resultCode === 10){  
                dispatch(getCaptchaUrl())
            } 
            setError('server', {
                type: 'custom',
                message: response.data.messages 
              });
        }
} 
export const getCaptchaUrl = () => async(dispatch:any) =>{ 
    let response = await securityAPI.getCaptcha() 
    debugger
    dispatch(getCaptchaUrlAC(response.data.url))
    }
export const logoutTC = () => async(dispatch:any) =>{ 
        let response = await authAPI.authLogout() 
        if(response.data.resultCode === 0){ 
         dispatch(setUserDataAC(null, null,null, false))
        } 
    }

export default authreducer