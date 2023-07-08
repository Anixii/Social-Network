import { GetItemType, ResponseType, instance } from "./api"
export const userAPI = { 
    getUsers (currentPage:number,pageSize:number) { 
        return instance.get<GetItemType>(`users?page=${currentPage}&count=${pageSize}`,{ 
                withCredentials:true
            })  
            .then(response => response.data)
        },  
        onFollow(id:number){ 
            return instance.post<ResponseType>(`follow/${id}`, {},) 
        }, 
        unFollow(id:number){ 
            return instance.delete<ResponseType>(`follow/${id}`) 
        }
}    
