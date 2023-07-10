import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
type FormValuesType = { 
    term: string  
    isFriend: boolean
}
export const UsersSearchForm = () => { 
    const { 
        reset, 
        register, 
        handleSubmit, 
        formState:{errors } 
    } = useForm<FormValuesType>({ 
        mode:'onBlur'
    }) 
    const onSubmit:SubmitHandler<FormValuesType> = (formData) =>{ 

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
            <input
                type="checkbox"
                {...register("isFriend")}
                /> Friend
            {errors.term && <span>{errors.term?.message || "Error!"}</span>}
        </div>
    <button>Найти</button>     
    </form>
  )
}
