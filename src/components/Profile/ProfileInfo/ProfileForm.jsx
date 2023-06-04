import { useForm } from "react-hook-form" 
 const ProfileForm = () =>{  
    const onSubmit = (formData) => {  
        reset()
    }
    const { 
        register, 
        handleSubmit, 
        formState:{ 
            errors, isValid
        }, 
        reset,
    } = useForm( { 
        mode: 'onBlur'
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
            /> Remember me
        </label>
        <br />
        <label>Professional Skills:
            <br />
            <input 
                type="text"
                {...register("lookingForAJocDescription", {
                    required: "This field is requiered."
                })}
                
            />
        </label>
        <br />
        <div >
            {errors.lookignForAJobDescription && <span>{errors.lookignForAJobDescription?.message || "Error!"}</span>}
        </div>  
        <input type="submit"  value="Сохранить" />
    </form>
        </>
    )
} 
export default ProfileForm