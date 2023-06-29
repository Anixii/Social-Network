import { useForm } from "react-hook-form" 
 const ProfileForm = ({saveProfileTC,handleEdit,profile}) =>{  
    const onSubmit = (formData, ) => {  
        reset() 
        console.log(formData);  
        saveProfileTC(formData)
        handleEdit()
    }
    const { 
        register, 
        handleSubmit, 
        formState:{ 
            errors, 
        }, 
        reset,
    } = useForm( { 
        mode: 'onBlur', 
        defaultValues:{ 
            fullName: profile.fullName, 
            aboutMe: profile.aboutMe, 
            lookingForAJob: profile.lookingForAJob, 
            LookingForAJobDescription: profile.lookingForAJobDescription, 
            
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
                {...register("LookingForAJobDescription", {
                    required: "This field is requiered."
                })}
                
            />
        </label>
        <br />
        <div >
            {errors.lookignForAJobDescription && <span>{errors.lookignForAJobDescription?.message || "Error!"}</span>}
        </div>    
         
        <div> 
            {Object.keys(profile.contacts).map((item,index) =><div key={index}> 
              <label>{item}</label>:  
              <input  
                defaultValue={profile.contacts[item]}
                type="text"
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