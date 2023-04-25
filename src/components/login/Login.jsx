import { Field, reduxForm } from "redux-form"

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
        <div> <Field name={'login'} type="text" placeholder="Login" component={'input'} /></div> 
        <div><Field name={"password"} type="password" placeholder="Password" component={'input'}/></div>
        <div><Field name={"rememberMe"} type="checkbox" component={'input'}/> Remember me</div>
        <div> <button>Log in</button></div>
    </form> 
    )
} 
const ReduxLoginForm = reduxForm({ 
    form: 'login'
})(LoginForm)
export default Login