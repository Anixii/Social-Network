import { Field, reduxForm } from "redux-form"

const Login =(props) =>{ 
     
    return(  
        <div> 

        <div>Login</div>
         
       <ReduxLoginForm/>
         
        </div>
    )
}  
const LoginForm = (props) =>{ 
    return( 
        <form action=""> 
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