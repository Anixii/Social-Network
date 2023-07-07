import s from './Dialogs.module.css' 
import Dialog from './Dialog/Dialog' 
import Message from './Message/Message'  
import { SubmitHandler, useForm } from 'react-hook-form'  
import { initialStateType as DialogStateType } from '../../redux/dialogsReducer'
import React, { FC } from 'react' 
type PropsType = { 
    addMessage: (text:string) => void 
    state: DialogStateType
} 
type FormValues = { 
    newMessageText: string
}
const Dialogs:FC<PropsType> =(props) =>{  
    const onSubmit:SubmitHandler<FormValues> = (dataObj) =>{ 
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
            <DialogForms onSubmit={onSubmit}/>
        </div>
    )
}   
type DialogPropsType = { 
    onSubmit: (data:FormValues)=> void
}
const DialogForms:FC<DialogPropsType> = (props) => { 
    const { 
        register, 
        formState: { 
            errors
        }, 
        handleSubmit
    } = useForm<FormValues>()
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