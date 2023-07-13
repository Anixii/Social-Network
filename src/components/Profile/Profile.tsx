import s from './Profile.module.css'  
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from './Posts/PostsContainer'
import Preloader from '../common/Preloader' 
import { ProfileType } from '../../redux/profileReducer'
import { FC } from 'react'
type PropsType = { 
    profile: ProfileType | null  
    isOwner: boolean, 
    status:string 
    updateStatusThunkC: (status:string) => void,  
    savePhotoTC: (photo:any) => void, 
    saveProfileTC:(data: ProfileType) => void

}
const Profile:FC<PropsType> = (props) =>{    
    if(!props.profile){ 
        return <Preloader/>
    }  

    return( 
        <div className={s.profile}> 
            <ProfileInfo {...props}/>
            <PostsContainer />
        </div>
    )
} 
export default Profile 

