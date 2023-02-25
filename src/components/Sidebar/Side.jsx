import s from './Side.module.css' 
import { NavLink, Link } from 'react-router-dom' 
 
const Sidebar = () =>{ 
    return( 
        <div className={s.navbar}> 
            <div className={s.navbar__item}> 
                
                 <NavLink to= '/profile' activeClassName={s.active}>Profile</NavLink> 
            </div>
            <div className={s.navbar__item}> 
                <NavLink to= '/dialogs' activeClassName={s.active} >Messages</NavLink> 
            </div>
            <div className={s.navbar__item}> 
                <NavLink to= '/users'>Users</NavLink> 
            </div>
            <div className={s.navbar__item}> 
                <NavLink to= '/Profile'>Music</NavLink> 
            </div>
            <div className={s.navbar__item}> 
                <NavLink to= '/Profile'>Settigns</NavLink> 
            </div> 
        </div>
    )
}  
export  default Sidebar