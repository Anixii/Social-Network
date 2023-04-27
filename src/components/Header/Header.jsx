import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
function Header(props){ 
    return( 
        <div className={s.header}> 
            <div className={s.header__image}><img src="" alt="something" /></div>
            <div className={s.login_block}> 
              {props.isAuth ?   ( <button onClick={props.logoutTC}>Log out {props.login}</button>) :<NavLink to={'/login'}>Login</NavLink>  }
            </div>
         </div>
    )
} 
export default Header