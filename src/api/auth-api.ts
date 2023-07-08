import { instance, AuthLoginType, AuthMeType } from "./api"  
export const authAPI = {  
    me(){ 
     return instance.get<AuthMeType>(`auth/me`).then(res => res.data)
    },  
    authLogin(email:string, password:string, rememberMe = false, captcha:string | null = null){ 
     return instance.post<AuthLoginType>(`auth/login`, {email, password, rememberMe,captcha})
    }, 
    authLogout() { 
     return instance.delete(`auth/login`)
    }
 }  