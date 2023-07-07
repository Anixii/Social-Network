import { NavLink } from 'react-router-dom';
import s from './Header.module.css'; 
import { FC } from 'react';
type PropsType ={ 
    login: string | null 
    isAuth:boolean, 
    logoutTC: () => void
}
const Header:FC<PropsType> = ({login,logoutTC,isAuth,...props})=>{ 
    return( 
        <div className={s.header}> 
            <div className={s.header__image}><img src="" alt="something" /></div>
              <div className={s.login_block}> 
              {isAuth ?   ( <button onClick={logoutTC}>Log out {login}</button>) :<NavLink to={'/login'}>Login</NavLink>  }
               </div>
         </div>
    )
} 
export default Header