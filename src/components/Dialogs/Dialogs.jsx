
import s from './Dialogs.module.css' 
import Dialog from './Dialog/Dialog' 
import Message from './Message/Message'  
import { useForm } from 'react-hook-form' 
import React from 'react'
function Dialogs(props){  
    const onSubmit = (dataObj) =>{ 
        props.addMessage(dataObj.newMessageText) 
        console.log(dataObj)
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
            <DialogForms onSubmit={onSubmit}/>
        </div>
    )
}  

const DialogForms = (props) => { 
    const { 
        register, 
        formState: { 
            errors
        }, 
        handleSubmit
    } = useForm()
    return( 
        <form onSubmit={handleSubmit(props.onSubmit)}>  
        <label > 
        Message: 
        <input type="text" {...register('newMessageText', {required:'Поле не объязательно к заполнению', minLength: { 
            value: 3, 
            message: `Минимум 3 символов `
        }})} /> 
        </label> 
        <div>{errors?.newMessageText && <p>{errors?.newMessageText?.message || 'error'} </p>} </div>
        <input type="submit" />
        </form>
    )
}

export default Dialogs