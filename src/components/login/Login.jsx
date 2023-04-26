import { Field, reduxForm } from "redux-form"
import { Input, PasswordInput } from "../common/FormsControls" 
import { required } from "../../utils/validators/validators"
const Login =(props) =>{ 
     const onSubmit = (formData) =>{ 
        console.log(formData)
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
        <div> <Field name={'login'}  placeholder="Login" component={Input} validate={[required]} /></div> 
        <div><Field name={"password"}  placeholder="Password" component={PasswordInput} validate={[required]}/></div>
        <div><Field name={"rememberMe"} type="checkbox" component={Input} validate={[required]}/> Remember me</div>
        <div> <button>Log in</button></div>
    </form> 
    )
} 
const ReduxLoginForm = reduxForm({ 
    form: 'login'
})(LoginForm)
export default Login