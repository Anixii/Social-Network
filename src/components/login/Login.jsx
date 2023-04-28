import { Field, reduxForm } from "redux-form"
import { Input, PasswordInput } from "../common/FormsControls" 
import { required } from "../../utils/validators/validators"
import { connect } from "react-redux"  
import { loginTC } from "../../redux/auth-reducer"
import { Navigate } from "react-router-dom"
const Login =(props) =>{ 
     const onSubmit = (formData) =>{ 
        props.loginTC(formData.email, formData.password, formData.rememberMe)
     }  
     console.log(props)
     if(props.isAuth){  
   
        return <Navigate to={'/profile/'}/>
    }
    return(  
        <div> 
        <div>Login</div> 
       <ReduxLoginForm onSubmit={onSubmit}/>    
        </div>
    )
}   

const LoginForm = (props) =>{    
    return( 
        <form onSubmit={props.handleSubmit}> 
        <div> <Field name={'email'}  placeholder="Login" component={Input} validate={[required]} /></div> 
        <div><Field name={"password"}  placeholder="Password" type="password" component={PasswordInput} validate={[required]}/></div>
        <div><Field name={"rememberMe"} type="checkbox" component={Input} /> Remember me</div>
       
        {/* {props.errorResponse && 
       <div>
          {props.errorResponse}
       </div>} */}
         <div> <button>Log in</button></div>
    </form> 
    )
} 
const ReduxLoginForm = reduxForm({ 
    form: 'login'
})(LoginForm) 

const mapStateToProps = (state) =>{ 
    return{ 
        isAuth: state.auth.isAuth, 
        //errorResponse : state.auth.error
    }
}
export default connect(mapStateToProps , {loginTC})(Login)