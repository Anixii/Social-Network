import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterUserType } from '../../redux/usersReducer'
import { Select } from 'antd'
type FormValuesType = { 
    term: string  
    // isFriend: boolean
} 
type PropsType = { 
    onFilterChanged:(filter:FilterUserType) => void
}
export const UsersSearchForm:React.FC<PropsType> = (props) => { 
    const { 
        reset,  
        control,
        register, 
        handleSubmit, 
        formState:{errors } 
    } = useForm<FilterUserType>({ 
        mode:'onSubmit'
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
            {...register("term",)}
            />  
            {errors.term && <span>{errors.term?.message || "Error!"}</span>} 
        </div>   
        <div> 
            {/* <input
                type="checkbox"
                {...register("friend")}
                /> Friend */}
            <Controller
                    name="friend"
                    control={control}
                    render={({field}) => <Select {...field}   
                    defaultValue='null'
                    options={[ 
                        {value: 'null',label: 'All Users',}, 
                        {value: 'true',label: 'Only Followed',}, 
                        {value: 'false',label: 'Only Unfollowed',} 
                        ]}> 
                     
                     </Select>}/>
        </div>
    <button>Найти</button>     
    </form>
  )
}
