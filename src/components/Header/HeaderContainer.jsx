import React from "react";
import Header from "./Header";  
import { isUserAuth, isUserLoggined } from "../../redux/authSelector";
import { connect } from "react-redux"; 
import {  logoutTC } from "../../redux/auth-reducer";
import { compose } from "redux";

class HeaderContainer extends React.Component{ 
    
    render(){  
        return( 
            <Header {...this.props}/>
        )
    }
} 

const mapStateToProps = (state) => {  
    return{ 
        isAuth:  isUserAuth(state), 
        login:isUserLoggined(state),
    }
} 

export default compose( 
    connect(mapStateToProps, {logoutTC})
)(HeaderContainer)