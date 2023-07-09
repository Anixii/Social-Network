import { GetItemType, ResponseType, instance } from "./api"
export const userAPI = { 
    getUsers (currentPage:number,pageSize:number) { 
        return instance.get<GetItemType>(`users?page=${currentPage}&count=${pageSize}`,{ 
                withCredentials:true
            })  
            .then(response => response.data)
        },  
        onFollow(id:number){ 
            return instance.post<ResponseType>(`follow/${id}`, {},).then((res) => res.data)
        }, 
        unFollow(id:number){ 
            return instance.delete(`follow/${id}`) as Promise<ResponseType>
        }
}    
