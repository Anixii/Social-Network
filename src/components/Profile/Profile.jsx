import s from './Profile.module.css'  
import ProfileInfo from './ProfileInfo/ProfileInfo'
import PostsContainer from './Posts/PostsContainer'
import Preloader from '../common/Preloader'
function Profile(props){   
    if(!props.profile){ 
        return <Preloader/>
    }  

    return( 
        <div className={s.profile}> 
            <ProfileInfo profile={props.profile} {...props}/>
            <PostsContainer />
        </div>
    )
} 
export default Profile 

// background='https://avatars.mds.yandex.net/i?id=d5e992ca85cbe1725f7c98d9889701038921ac26-4838719-images-thumbs&n=13' ava='https://forcepower.in/img/team-img/team-1.jpg'