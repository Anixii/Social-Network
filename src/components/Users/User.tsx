import s from './Users.module.css' 
import  userImage from '../../assets/image/user.png'; 
import { NavLink } from 'react-router-dom'; 
import { UserActionType } from '../../redux/usersReducer'; 
import { FC } from 'react'; 
type UserType = { 
    item: UserActionType, 
    unfollowThunk: (id:number|null) => void,
    followThunk: (id:number|null) => void, 
    isFollowing: any
} 

 const User:FC<UserType> = ({item,...props}) =>{  
    return( 
        <div>
            <div> 
                <span> 
            <div> 
                <NavLink to={'/profile/' + item.id}> 
                <img className={s.image} src={item.photos.small != null ? item.photos.small : userImage} alt="" /> 
                </NavLink> 
            </div> 
            </span> 
            <span> 
                <div> 
                    
                {item.followed 
                ? <button disabled={props.isFollowing.userId === item.id} onClick={() => 
                    {    
                       props.unfollowThunk(item.id) } 
                 
                } >unfollow</button>  
                :<button disabled={props.isFollowing.userId === item.id} onClick={() => {   
                 props.followThunk(item.id)
                }}>follow</button>   
                }
                    </div> 
                </span>  
                <div>{item.name}</div>
                <div>{item.status}</div>
            </div>
             
        </div>
    )
} 
export default User