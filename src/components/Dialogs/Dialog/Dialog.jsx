import { NavLink } from 'react-router-dom'
import s from './Dialog.module.css' 
function Dialog(props){ 
    return( 
        <div className={s.dialog}> 
            <NavLink className={s.dialog__item} to={'/dialogs/' + props.id}>{props.name}</NavLink> 
        </div>
    )
} 
export default Dialog