import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FilterUserType } from '../../redux/usersReducer'

// type FormValuesType = { 
//     term: string  
//     // isFriend: boolean
// } 
type PropsType = { 
    onFilterChanged:(filter:FilterUserType) => void
}
export const UsersSearchForm:React.FC<PropsType> = (props) => { 
    const { 
        reset, 
        register, 
        handleSubmit, 
        formState:{errors } 
    } = useForm<FilterUserType>({ 
        mode:'onBlur'
    }) 
    const onSubmit:SubmitHandler<FilterUserType> = (formData) =>{ 
        props.onFilterChanged(formData)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>  
        <div>  
            Search
            <input 
            type="text"
            {...register("term", {
                required: "This field is requiered."
            })}
            />  
            {errors.term && <span>{errors.term?.message || "Error!"}</span>} 
        </div>   
        <div> 
            {/* <input
                type="checkbox"
                {...register("isFriend")}
                /> Friend
            {errors.term && <span>{errors.term?.message || "Error!"}</span>} */}
        </div>
    <button>Найти</button>     
    </form>
  )
}
