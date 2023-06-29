import axios from "axios"; 
 

 
const instance = axios.create({ 
    withCredentials:true,   
    baseURL: 'https://social-network.samuraijs.com/api/1.0/' ,
    headers: {'API-KEY': '0adaae07-4e14-40b8-b038-30ec25a5b1cd'}
}) 

export const userAPI = { 
    getUsers (currentPage,pageSize) { 
        return instance.get(`users?page=${currentPage}&count=${pageSize}`,{ 
                withCredentials:true
            })  
            .then(response => response.data)
        }, 
} 
export const authAPI = {  
   me(){ 
    return instance.get(`auth/me`)   
   }, 
   getProfile (id) {  
    console.warn('NOOOO')
    return ProfileAPI.getProfile(id)
   }, 
   authLogin(email, password, rememberMe = false, captcha){ 
    return instance.post(`auth/login`, {email, password, rememberMe,captcha})
   }, 
   authLogout() { 
    return instance.delete(`auth/login`)
   }
}   
export const ProfileAPI ={ 
    getProfile (id) { 
        return instance.get(`profile/${id}`)
       },
    getStatus (id){ 
        return instance.get(`profile/status/${id}`)
    }, 
    updateStatus (status){ 
        return instance.put(`profile/status`,{status})
    }, 
    savePhoto(photoFile){  
        let formData = new FormData() 
        formData.append('image', photoFile) 
        return instance.put(`profile/photo`, formData, {  
            headers:{ 
                'Content-Type': 'multipart/form-data'
            }
        })
    } ,
    saveProfile(profile){ 
        return instance.put(`profile`, profile)
    }
    }
export const followAPI = { 
    onFollow(id){ 
        return instance.post(`follow/${id}`, {},) 
    }, 
    unFollow(id){ 
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
