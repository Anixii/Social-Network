import s from './ProfileInfo.module.css' 

function ProfileInfo(props){ 
    return( 
        <div className={s.info}> 
            <div className={s.info__image}> <img  className={s.bg__img} src={props.background} alt="Background Img" /></div> 
            <div className={s.item}> <img className={s.ava} src={props.ava} alt='Ava'></img></div> 

        </div>
    )
} 
export default ProfileInfo