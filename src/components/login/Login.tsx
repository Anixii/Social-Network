
import { connect } from "react-redux"  
import { loginTC } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
import {SubmitHandler, useForm } from "react-hook-form" 
import { isUserAuth } from "../../redux/authSelector" 
import { FC } from "react"
import { AppStateType } from "../../redux/redux-store" 
// import { Message, MultipleFieldErrors, Ref, } from "react-hook-form"  
// export type FieldError = {
//     type: string
//     ref?: Ref
//     types?: MultipleFieldErrors
//     message?: Message
// } 
type MapStateToPropsType = { 
    isAuth: boolean, 
    captchaUrl: string | null
} 
type MapDispatchToPropsType= {
    loginTC: (email:string,password:string,rememberMe: boolean, setError:Function, captcha: string | null) => void
} 
type PropsType = MapDispatchToPropsType & MapStateToPropsType
const Login:FC<PropsType> =(props) =>{  
    
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
type FormValuesType ={ 
    email: string, 
    password: string,  
    rememberMe: boolean, 
    captcha: string | null, 
    server: any
} 
type LoginFormPropsType = { 
    loginTC: (email:string,password:string,rememberMe: boolean, setError:Function, captcha: string | null)=>void, 
    captchaUrl: string | null
} 
const LoginForm:FC<LoginFormPropsType> = (props) => { 
    const onSubmit:SubmitHandler<FormValuesType> = (formData) => {  
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

    } = useForm<FormValuesType>( { 
        mode: 'onBlur'
    }) 
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
                <span>{errors.server.message as string}</span>
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

const mapStateToProps = (state:AppStateType):MapStateToPropsType =>{ 
    return{ 
        isAuth: isUserAuth(state),  
        captchaUrl: state.auth.captchaUrl
    }
}
export default connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps , {loginTC})(Login) 