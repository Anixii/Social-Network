import Preloader from '../../common/Preloader'
import s from './ProfileInfo.module.css' 
import ProfileStatus from './ProfileStatus'
function ProfileInfo(props){  
    if(!props.profile){ 
        return <Preloader/>
    } 
    return(  
        
        <div className={s.info}>   
        
        <div> NickName: {props.profile.fullName}</div>
            <div className={s.info__image}> <img  className={s.bg__img} src={props.profile.photos.small} alt="Background Img" /></div> 
            <div className={s.item}> <img className={s.ava} src={props.profile.photos.large} alt='Ava'></img></div>  
            <div> 
                Обо мне: {props.profile.aboutMe}
            </div>  
            <ProfileStatus status={props.status} updateStatusThunkC={props.updateStatusThunkC}/> 
            <div>Контакты: 
                <ul> 
                    <li>Вк {props.profile.contacts.vk}</li>
                    <li>Инста {props.profile.contacts.instagram}</li>
                    <li>Твитер {props.profile.contacts.twitter} </li>
                </ul>
            </div>

        </div>
    )
} 
export default ProfileInfo