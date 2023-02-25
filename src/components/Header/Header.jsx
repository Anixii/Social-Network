import s from './Header.module.css';
function Header(props){ 
    return( 
        <div className={s.header}> 
            <div className={s.header__image}><img src="" alt="something" /></div>
        </div>
    )
} 
export default Header