
import { connect } from "react-redux"  
import { loginTC } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
import { useForm } from "react-hook-form" 
import { isUserAuth } from "../../redux/authSelector"
const Login =(props) =>{  
    
     if(props.isAuth){  
   
        return <Navigate to={'/profile/'}/>
    }
    return(  
        <div> 
        <div>Login</div> 
       <LoginForm {...props}/>    
        </div>
    )
}   
const LoginForm = (props) => { 
    const onSubmit = (formData) => {  
        props.loginTC(formData.email, formData.password, formData.rememberMe,setError, formData.captcha) 
        reset()
    }
    const { 
        register, 
        handleSubmit, 
        formState:{ 
            errors, isValid
        }, 
        reset, 
        setError, 
        clearErrors

    } = useForm( { 
        mode: 'onBlur'
    }) 
    console.log(props);
    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
         
         <label>Email:
            <br />
            <input 
               onFocus={() => clearErrors(["email", "server"])}
                {...register("email", {
                    required: "This field is requiered.",
                    minLength: {
                        value: 5,
                        message: "Your login must be at least 5 symbols long."
                    }
                })}
                
            />
        </label>
        <br />
        <div>
            {errors.email && <span>{errors.email?.message || "Error!"}</span>}
        </div>
        <label>Password:
            <br />
            <input 
               onFocus={() => clearErrors(["password", "server"])}
                type="password"
                {...register("password", {
                    required: "This field is requiered."
                })}
                
            />
        </label>
        <br />
        <div >
            {errors.password && <span>{errors.password.message || "Error!"}</span>}
        </div>
        <label>
            <input
                type="checkbox"
                {...register("rememberMe")}
            /> Remember me
        </label>
        <br />
        {errors.server
            &&
            <div >
                <span>{errors.server.message}</span>
            </div>} 

             
            {props.captchaUrl &&  
            <div> 
                <div> 
                    <img src={props.captchaUrl} alt="wow"/> 
                </div> 
                <div> 
                <input
                type="text"
                {...register("captcha")}
            />
                </div>
             </div>}
        <input type="submit" disabled={!isValid} value="Log in" />
    </form>
    )
}

const mapStateToProps = (state) =>{ 
    return{ 
        isAuth: isUserAuth(state),  
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect(mapStateToProps , {loginTC})(Login)