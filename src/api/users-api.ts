import { GetItemType, ResponseType, instance } from "./api"
export const userAPI = { 
    getUsers (currentPage:number,pageSize:number,term:string = '') { 
        return instance.get<GetItemType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`,{ 
                withCredentials:true
            })  
            .then(response => response.data)
        },  
        onFollow(id:number|null){  
            return instance.post<ResponseType>(`follow/${id}`, {},).then((res) =>{ 
                console.log(res);
                return res.data 
            }  
            )
        }, 
        unFollow(id:number|null){ 
            return instance.delete<ResponseType>(`follow/${id}`).then(res => res.data)
        }
}    
