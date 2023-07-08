import { ResponseType, instance } from "./api"  
import { PhotoType, ProfileType } from "../redux/profileReducer";
type SavePhotoType = { 
    photos: PhotoType
} 
export const ProfileAPI ={ 
    getProfile (id:number | null) { 
        return instance.get<ProfileType>(`profile/${id}`).then((res) => res.data)
       },
    getStatus (id:number){ 
        return instance.get<string>(`profile/status/${id}`)
    }, 
    updateStatus (status:string){ 
        return instance.put<ResponseType>(`profile/status`,{status})
    }, 
    savePhoto(photoFile:any){  
        let formData = new FormData() 
        formData.append('image', photoFile) 
        return instance.put<ResponseType<SavePhotoType>>(`profile/photo`, formData, {  
            headers:{ 
                'Content-Type': 'multipart/form-data'
            }
        })
    } ,
    saveProfile(profile:ProfileType){ 
        return instance.put<ResponseType>(`profile`, profile)
    }
    }