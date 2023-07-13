
import { SubmitHandler, useForm } from "react-hook-form"  
import { ContactType, PhotoType, ProfileType } from "../../../redux/profileReducer"
import { FC } from "react"
type PropsType = { 
    saveProfileTC:(data:ProfileType) =>void, 
    handleEdit: (value:boolean) =>void 
    profile: ProfileType
}  
type FormValuesType = {   
    fullName: string 
    aboutMe: string  
    lookingForAJobDescription: string 
    lookingForAJob:boolean
    //Эти значения снизу не нужны!
    userId: number 
    photos: PhotoType
    contacts: ContactType
}
const ProfileForm:FC<PropsType> = ({saveProfileTC,handleEdit,profile}) =>{  
    const onSubmit:SubmitHandler<FormValuesType> = (formData) => {  
        reset() 
        saveProfileTC(formData)
        handleEdit(false)
    }
    const { 
        register, 
        handleSubmit, 
        formState:{ 
            errors, 
        }, 
        reset,
    } = useForm<FormValuesType>( { 
        mode: 'onBlur', 
        defaultValues:{ 
            fullName: profile.fullName, 
            aboutMe: profile.aboutMe, 
            lookingForAJob: profile.lookingForAJob, 
            lookingForAJobDescription: profile.lookingForAJobDescription,      
        }
    })
    return( 
        <>  
    <form onSubmit={handleSubmit(onSubmit)}>
        <label>NickName:
            <br />
            <input  
            
                {...register("fullName", {
                    required: "This field is requiered.",
                })}
                
            />
        </label>
            {errors.fullName && <span>{errors.fullName?.message || "Error!"}</span>}
        <br />
        <label>About me:
            <br />
            <input 
                type="text"
                {...register("aboutMe", {
                    required: "This field is requiered."
                })}
                
            />
        </label>
        <br />
        <div >
            {errors.aboutMe && <span>{errors.aboutMe.message || "Error!"}</span>}
        </div>
        <label>
            <input
                type="checkbox"
                {...register("lookingForAJob")}
            /> looking For A Job
        </label>
        <br />
        <label>Professional Skills:
            <br />
            <input 
                type="text"
                {...register("lookingForAJobDescription", {
                    required: "This field is requiered."
                })}
                
            />
        </label>
        <br />
        <div >
            {errors.lookingForAJobDescription && <span>{errors.lookingForAJobDescription?.message || "Error!"}</span>}
        </div>    
         
        <div> 
            {Object.keys(profile.contacts).map((item,index) =><div key={index}> 
              <label>{item}</label>:  
              <input    
              //@ts-ignore
                defaultValue={profile.contacts[item as keyof ContactType]}
                type="text" 
                //@ts-ignore
                {...register(`contacts.${item}`)} 
            /> 
            </div>)}

        </div>
        <input type="submit"  value="Сохранить" />
    </form>
        <button onClick={()=> handleEdit(false)}>Отменить</button>
        </>
    )
} 
export default ProfileForm