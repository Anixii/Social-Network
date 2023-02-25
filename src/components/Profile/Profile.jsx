import s from './Profile.module.css'  
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './Posts/Posts' 
import PostsContainer from './Posts/PostsContainer'
function Profile(props){ 
    return( 
        <div className={s.profile}> 
            <ProfileInfo background='https://avatars.mds.yandex.net/i?id=d5e992ca85cbe1725f7c98d9889701038921ac26-4838719-images-thumbs&n=13' ava='https://forcepower.in/img/team-img/team-1.jpg'/>
            <PostsContainer />
        </div>
    )
} 
export default Profile