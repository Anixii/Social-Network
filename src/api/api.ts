import axios from "axios"; 
import { ProfileType } from "../redux/profileReducer";
import { type } from "os";
 

 
const instance = axios.create({ 
    withCredentials:true,   
    baseURL: 'https://social-network.samuraijs.com/api/1.0/' ,
    headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}
}) 

export const userAPI = { 
    getUsers (currentPage:number,pageSize:number) { 
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,{ 
                withCredentials:true
            })  
            .then(response => response.data)
        }, 
}   
export enum ResultCodesEnum { 
    Success = 0, 
    Error = 1,  
    Capthcha = 10
}
type AuthMeType = { 
    data:{ id:number, email: string,login:string} 
    resultCode: ResultCodesEnum
    messages: Array<string>
} 
type AuthLoginType = { 
    data:{ userId: number} 
    resultCode: ResultCodesEnum 
    messages: Array<string>
}
export const authAPI = {  
   me(){ 
    return instance.get<AuthMeType>(`auth/me`).then(res => res.data)
   }, 
   getProfile (id:number) {  
    return ProfileAPI.getProfile(id)
   }, 
   authLogin(email:string, password:number, rememberMe = false, captcha:string | null = null){ 
    return instance.post<AuthLoginType>(`auth/login`, {email, password, rememberMe,captcha})
   }, 
   authLogout() { 
    return instance.delete(`auth/login`)
   }
}   
export const ProfileAPI ={ 
    getProfile (id:number | null) { 
        return instance.get(`profile/${id}`)
       },
    getStatus (id:number){ 
        return instance.get(`profile/status/${id}`)
    }, 
    updateStatus (status:string){ 
        return instance.put(`profile/status`,{status})
    }, 
    savePhoto(photoFile:any){  
        let formData = new FormData() 
        formData.append('image', photoFile) 
        return instance.put(`profile/photo`, formData, {  
            headers:{ 
                'Content-Type': 'multipart/form-data'
            }
        })
    } ,
    saveProfile(profile:ProfileType){ 
        return instance.put(`profile`, profile)
    }
    }
export const followAPI = { 
    onFollow(id:number){ 
        return instance.post(`follow/${id}`, {},) 
    }, 
    unFollow(id:number){ 
        return instance.delete(`follow/${id}`) 
    }
} 
export const securityAPI = { 
    getCaptcha(){ 
        return instance.get(`security/get-captcha-url`)
    }
}

// axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { 
//     withCredentials: true
// }) 
// axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, {},{ withCredentials:true, headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}})
//axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${item.id}`, { withCredentials:true,headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}}) 
