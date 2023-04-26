
import s from './Dialogs.module.css' 
import Dialog from './Dialog/Dialog' 
import Message from './Message/Message'  
import React from 'react'
import { Field, reduxForm } from 'redux-form'

function Dialogs(props){  

    const onSubmit = (dataObj) =>{ 

        props.addMessage(dataObj.newMessageText)
    }
    let dialogsElem = props.state.dialogItem 
    .map(arg => <Dialog name={arg.name} id={arg.id}/> ); 
    const messageElem = props.state.messageItem 
    .map(m => <Message message={m.message} />  )

    return(
 
 <div className={s.dialogs}> 
            <div className={s.dialogItem}>          
              {dialogsElem} 
                
            </div>
 
             <div className={s.messages}>  
                {messageElem}
                
            </div>  
            <ReduxDialogForm onSubmit={onSubmit  } />
        </div>
    )
}  


const DialogForms = (props) =>{ 
return( 
    <form onSubmit={props.handleSubmit} > 
            <div><Field component={'textarea'} name='newMessageText'  
            ></Field></div>  
            <div><button >Add message</button></div>
        </form>
)
} 
const ReduxDialogForm = reduxForm({ 
    form: 'dialogAddMessageForm'
})(DialogForms)
export default Dialogs