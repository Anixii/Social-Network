import s from './Message.module.css'
import React from 'react' 

function Message(props){ 
    
    return(   

        <div className={s.message}> 
            <div className={s.item}> 
                {props.message} 
            </div> 
           
        </div>
    )
 } 
 export default Message 