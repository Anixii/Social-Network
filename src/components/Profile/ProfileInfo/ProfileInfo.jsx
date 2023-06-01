import Preloader from '../../common/Preloader'
import s from './ProfileInfo.module.css' 
import ProfileStatus from './ProfileStatus' 
import userAnonimAvatar from '../../../assets/image/user.png'
function ProfileInfo({profile,status,...props}){  
    if(!profile){ 
        return <Preloader/>
    }  
    const onPhotoSelected = (e) =>{ 
        if(e.target.files.length){ 
            props.savePhotoTC(e.target.files[0])
        }
    }
    return(  
        
        <div className={s.info}>   
        
        <div> NickName: {profile.fullName}</div>
            <div className={s.item}> <img className={s.ava} src={profile.photos.large || userAnonimAvatar } alt='Ava'></img></div> 
            <div>{props.isOwner && <input type='file' onChange={onPhotoSelected}/>}</div>  
            <div> 
                Обо мне: {profile.aboutMe}
            </div>  
            <ProfileStatus status={status} updateStatusThunkC={props.updateStatusThunkC}/> 
            <div>Контакты: 
                <ul> 
                    <li>Вк {profile.contacts.vk}</li>
                    <li>Инста {profile.contacts.instagram}</li>
                    <li>Твитер {profile.contacts.twitter} </li>
                </ul>
            </div>

        </div>
    )
} 
export default ProfileInfo