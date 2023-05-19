import s from './Users.module.css' 
import userImage from '../../assets/image/user.png'; 

import { NavLink } from 'react-router-dom';
import Paginator from './Paginator';

function Users({totalUsers,pageSize, setCurrentPage,currentPage, ...props}){   
    return( 
        <div>  
            <div> 
                <Paginator totalUsers={totalUsers} setCurrentPage={setCurrentPage} pageSize={pageSize} currentPage={currentPage}/>
            </div>
            <div> 
           {props.users.map(item =>  
            <div key={item.id}> 
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
                <div>{'item.location.city'}</div>
                <div>{'item.location.country'}</div>
            </div>) 
            } 
            </div>
        </div>
    )
} 
export default Users