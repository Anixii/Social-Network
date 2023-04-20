import React  from "react" 
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"

let mapStateToPropsRedirect = (state) => ({ 
    profile: state.postPage.profile,
    isAuth: state.auth.isAuth
})  
export const withAuthRedirect = (Component) =>{ 
    class RedirectComponent extends React.Component{ 
        render(){ 
            if(!this.props.isAuth) {
        return <Navigate to={'/login'}/>
    } 
    return <Component {...this.props}/>
        }
    } 
    let ConnectAuthRedirectComponent = connect(mapStateToPropsRedirect)(RedirectComponent)
return ConnectAuthRedirectComponent
}

