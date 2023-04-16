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
   logIn(){ 
    return instance.get(`auth/me`, { 
        withCredentials: true
    })   
   }
} 
// axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { 
//     withCredentials: true
// }) 


