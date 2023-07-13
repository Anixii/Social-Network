import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FilterUserType } from '../../redux/usersReducer'
import { Select } from 'antd'
type FormValuesType = { 
    term: string  
    friend: 'false' | 'true' | 'null'
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
    const onSubmit:SubmitHandler<FormValuesType> = (formData) =>{   
        const filter2:FilterUserType = {
            term: formData.term,
            friend: formData.friend === 'true'
               ? true
               : formData.friend === 'false' ? false : null
         }
        props.onFilterChanged(filter2) 
    }
  return ( 
    //@ts-ignore
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
