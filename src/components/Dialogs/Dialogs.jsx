
import s from './Dialogs.module.css' 
import Dialog from './Dialog/Dialog' 
import Message from './Message/Message'  
import React from 'react'
import { Navigate } from 'react-router-dom'

function Dialogs(props){  
    let newMessage = React.createRef()  
    const addMessage = () =>{   
        props.addMessage()
    }
    const onMessageChange = () =>{  
        let text = newMessage.current.value; 
        props.updateNewMessage(text)
    } 
    
    let dialogsElem = props.state.dialogItem 
    .map(arg => <Dialog name={arg.name} id={arg.id}/> ); 
    const messageElem = props.state.messageItem 
    .map(m => <Message message={m.message} />  )
 
    if(!props.isAuth){  
        return <Navigate to={'/login'}/>
    }
    return(
 
 <div className={s.dialogs}> 
            {/* <div><NavLink to='/dialogs/1>'> A</NavLink></div> */} 
            <div className={s.dialogItem}>          
              {dialogsElem} 
                
            </div>
 
             <div className={s.messages}>  
                {messageElem}
                
            </div> 
            <div><textarea onChange={onMessageChange} value={props.state.newMessageText} ref={newMessage}></textarea></div>  
            <div><button onClick={addMessage}>Add message</button></div>
        </div>
    )
} 
export default Dialogs