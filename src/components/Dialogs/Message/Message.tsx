import s from './Message.module.css'
import { FC } from 'react' 
type MessageType = { 
    message: string
}
const Message:FC<MessageType> = (props) =>{ 
    
    return(   

        <div className={s.message}> 
            <div className={s.item}> 
                {props.message} 
            </div> 
           
        </div>
    )
 } 
 export default Message 