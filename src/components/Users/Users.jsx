import s from './Users.module.css' 
import userImage from '../../assets/image/user.png'; 

import { NavLink } from 'react-router-dom';

function Users(props){   
    let pagesCount = Math.ceil(props.totalUsers / props.pageSize)
        let pages = []; 
        for(let i = 1; i<= pagesCount; i++){ 
            pages.push(i)
        } 
      
    return( 
        <div> 
            <div> 
                <div> 
                  {pages.map(item =>{ 
                   return(
                   <button onClick={() => {props.setCurrentPage(item)}} className={props.currentPage === item && s.selectedItem}>{item}</button>
                   )})} 
                </div>

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