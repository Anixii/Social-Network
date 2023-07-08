import { ThunkAction } from "redux-thunk"
import { ResultCodesEnum,  securityAPI } from "../api/api" 
import { authAPI } from "../api/auth-api" 
import { AppStateType } from "./redux-store"

const SET_USER_DATA ='AUTH_PAGE_SET_USER_DATA' 
const ERROR_MESSAGE ='AUTH_PAGE_ERROR_MESSAGE'
const GET_CAPTCHA ='AUTH_PAGE_GET_CAPTCHA'  
export type initialStateType = { 
    email: null | string 
    userId:  number | null 
    login:  string | null  
    isAuth: boolean 
    error: string | null 
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

 const authreducer= (state = initialState, action: AllActionCreatorsType):initialStateType =>{ 

    switch(action.type){ 
        case SET_USER_DATA: { 
            return {...state,  ...action.data}  
        }
        case ERROR_MESSAGE: { 
            return {
                ...state,
                error: action.error
            }
        }   
        case GET_CAPTCHA: { 
            return{...state,captchaUrl:action.url}
        }
        default: 
        return state
    }
}   
type AllActionCreatorsType = errorACType | setUserDataActionType  | GetCaptchaUrlType
type errorACType = { 
    type: typeof ERROR_MESSAGE  
    error: string
}
export const errorAC = (error:string):errorACType => ({type: ERROR_MESSAGE, error})    
 
type setUserDataActionPayloadType = { 
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type setUserDataActionType = { 
    type: typeof SET_USER_DATA 
    data:setUserDataActionPayloadType
} 
export const setUserDataAC = (userId:number | null, email:string| null, login:string| null, isAuth:boolean):setUserDataActionType => ({type: SET_USER_DATA, data:{userId,email,login, isAuth}}) 
  
type GetCaptchaUrlType = { 
    type: typeof GET_CAPTCHA 
    url:string
}
const getCaptchaUrlAC = (url: string):GetCaptchaUrlType =>({type:GET_CAPTCHA, url}) 
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AllActionCreatorsType>
export const loginThunkCreator = ():ThunkType => async(dispatch) =>{ 
    let response = await authAPI.me()
    if(response.resultCode === ResultCodesEnum.Success){        
        let {id,email,login} = response.data         
        dispatch(setUserDataAC(id,email,login, true))
    }; 
}
export const loginTC = (email:string, password:string,rememberMe:boolean, setError:Function, captcha:string | null = null):ThunkType =>async(dispatch) =>{ 
        let response = await authAPI.authLogin(email, password, rememberMe,captcha) 
        if(response.data.resultCode === ResultCodesEnum.Success){ 
            dispatch(loginThunkCreator())
        }else{   
            if(response.data.resultCode === ResultCodesEnum.Capthcha){  
                dispatch(getCaptchaUrl())
            } 
            setError('server', {
                type: 'custom',
                message: response.data.messages 
              });
        }
} 
export const getCaptchaUrl = ():ThunkType => async(dispatch) =>{ 
    let response = await securityAPI.getCaptcha() 
    dispatch(getCaptchaUrlAC(response.data.url))
    }
export const logoutTC = ():ThunkType => async(dispatch) =>{ 
        let response = await authAPI.authLogout() 
        if(response.data.resultCode === ResultCodesEnum.Success){ 
         dispatch(setUserDataAC(null, null,null, false))
        } 
    }

export default authreducer