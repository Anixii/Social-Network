import s from '../components/common/FormControls.module.css'

export const Element = (Element) =>{ 
    return ({meta,input, ...props }) =>{ 
        const hasError = meta.error && meta.touched 
        return( 
            <div className={s.form_control + ' ' + hasError ? s.error : ''} > 
             <Element {...input} {...props}/> 
            {hasError && <span>{meta.error}</span>} 
         </div>
        ) 
    }
} 
