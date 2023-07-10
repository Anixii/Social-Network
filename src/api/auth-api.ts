import { instance, AuthLoginType, AuthMeType, ResultCodeForCaptchaEnum, ResultCodesEnum,ResponseType } from "./api"  
type Result =  ResultCodesEnum | ResultCodeForCaptchaEnum
export const authAPI = {  
    me(){ 
     return instance.get<ResponseType<AuthMeType>>(`auth/me`).then(res => res.data)
    },  
    authLogin(email:string, password:string, rememberMe = false, captcha:string | null = null){ 
     return instance.post<ResponseType<AuthLoginType, Result>>(`auth/login`, {email, password, rememberMe,captcha})
    }, 
    authLogout() { 
     return instance.delete(`auth/login`)
    }
 }  