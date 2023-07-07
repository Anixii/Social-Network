import { NavLink } from 'react-router-dom'
import s from './Dialog.module.css'  
import { FC } from 'react'
type PropsType = { 
    name: string, 
    id: number
}
const Dialog:FC<PropsType> = (props)=>{ 
    return( 
        <div className={s.dialog}> 
            <NavLink className={s.dialog__item} to={'/dialogs/' + props.id}>{props.name}</NavLink> 
        </div>
    )
} 
export default Dialog