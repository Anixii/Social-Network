import Preloader from '../../common/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import userAnonimAvatar from '../../../assets/image/user.png'
import { useState } from 'react' 
import ProfileForm from './ProfileForm'
function ProfileInfo({ profile, status, ...props }) {
     
    const [edit, setEdit] = useState(false) 
    if (!profile) {
        return <Preloader />
    }
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhotoTC(e.target.files[0])
        }
    }
    return (

        <div className={s.info}> 
            <div className={s.item}> <img className={s.ava} src={profile.photos.large || userAnonimAvatar} alt='Ava'></img></div>
            <div>{props.isOwner && <input type='file' onChange={onPhotoSelected} />}</div>  
            {edit ? <ProfileForm/> :<ProfileData profile={profile} isOwner={props.isOwner} handleEdit={() => setEdit(true)}/>}
            
            <ProfileStatus status={status} updateStatusThunkC={props.updateStatusThunkC} />
        </div>
    )
}  
const ProfileData = ({profile, isOwner, handleEdit}) =>{ 
    return( 
        <div>  
            {isOwner && <button onClick={handleEdit}>Edit</button>}
             <div> NickName: {profile.fullName}</div>
            
            <ul> 
                <li>Имя: {profile.fullName}</li>
                <li> Обо мне: {profile.aboutMe}</li>
                <li> Ищу работу: {profile.lookignForAJob ? 'yes' : 'no'}</li>
                {profile.lookignForAJob && <li> 
                Скилы: {profile.lookignForAJobDescription}     
                </li>}
             </ul> 
             <div>Контакты:
                {Object.keys(profile.contacts).map((item,index) =><Contacts key={index} title={item} value={profile.contacts[item]}/>)}
            </div>

        </div>
    )
}
const Contacts = ({title, value}) =>{ 
    return( 
        <>  
        <li><b>{title}</b>: {value}</li> 
        </>
    )
} 
export default ProfileInfo