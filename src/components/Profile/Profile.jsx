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

