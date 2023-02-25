import s from './MyPosts.module.css' 
function MyPosts(props){ 
    return( 
        <div className={s.mypost} > 
            <div className={s.item}>{props.message}</div> 
            <div className={s.item}>{props.likes}</div> 
            
         </div>
    )
} 
export default MyPosts