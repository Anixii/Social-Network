import { FC } from 'react'
import s from './MyPosts.module.css' 
type PropsType =  { 
    message: string 
    likes: number
}
const MyPosts:FC<PropsType> = (props) =>{ 
    return( 
        <div className={s.mypost} > 
            <div className={s.item}>{props.message}</div> 
            <div className={s.item}>{props.likes}</div> 
            
         </div>
    )
} 
export default MyPosts