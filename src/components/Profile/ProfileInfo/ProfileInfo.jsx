import Preloader from '../../common/Preloader'
import s from './ProfileInfo.module.css' 
import ProfileStatus from './ProfileStatus'
function ProfileInfo({profile,status,...props}){  
    if(!profile){ 
        return <Preloader/>
    } 
    return(  
        
        <div className={s.info}>   
        
        <div> NickName: {profile.fullName}</div>
            <div className={s.info__image}> <img  className={s.bg__img} src={profile.photos.small} alt="Background Img" /></div> 
            <div className={s.item}> <img className={s.ava} src={profile.photos.large} alt='Ava'></img></div>  
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