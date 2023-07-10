import axios from "axios"; 
import { UserActionType } from "../redux/usersReducer";
import { Nullable } from "../types/types";

export const instance = axios.create({ 
    withCredentials:true,   
    baseURL: 'https://social-network.samuraijs.com/api/1.0/' ,
    headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}
}) 
export enum ResultCodesEnum { 
    Success = 0, 
    Error = 1,  
}  
export enum ResultCodeForCaptchaEnum {
    Captcha = 10
 }
type AuthMeDataType = { 
    id:number,  
    email: string, 
    login:string
} 
type AuthLoginDataType = { 
    userId: number
} 
type Result =  ResultCodesEnum | ResultCodeForCaptchaEnum
export type AuthMeType = ResponseType<AuthMeDataType, ResultCodesEnum >
export type AuthLoginType = ResponseType<AuthLoginDataType, Result> 

export type ResponseType<D = {}, RC = ResultCodesEnum> = { 
    data: D, 
    messages: Array<string> 
    resultCode:RC
} 
export type GetItemType = { 
    items: Array<UserActionType>, 
    totalCount:number, 
    error: Nullable<string>
}
type GetCaptchaUrlType = { 
    url: string
}
export const securityAPI = { 
    getCaptcha(){ 
        return instance.get<GetCaptchaUrlType> (`security/get-captcha-url`)
    }
}

// axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { 
//     withCredentials: true
// }) 
// axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, {},{ withCredentials:true, headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}})
//axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, { withCredentials:true,headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}}) 
