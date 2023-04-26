 import s from './FormControls.module.css'
 
 export const Textarea = ({input,meta, ...props}) =>{ 
   // console.log(props) 
    return( 
        <div className={s.form_control}> 
            <textarea {...input} {...props}/> 
            <span>{'some error'}</span> 
        </div>
    )
} 
