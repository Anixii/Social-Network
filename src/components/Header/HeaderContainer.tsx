import React from "react";
import Header from "./Header";  
import { isUserAuth, isUserLoggined } from "../../redux/authSelector";
import { connect } from "react-redux"; 
import {  logoutTC } from "../../redux/auth-reducer";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
type MapStateToPropsType = { 
    isAuth: boolean, 
    login: string | null
} 
type MapDispatchToPropsType ={ 
    logoutTC:() => void
} 
type PropsType = MapDispatchToPropsType & MapStateToPropsType
class HeaderContainer extends React.Component<PropsType>{
    render(){  
        return( 
            <Header {...this.props}/>
        )
    }
} 

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {  
    return{ 
        isAuth:  isUserAuth(state), 
        login:isUserLoggined(state),
    }
} 

export default compose<React.ComponentType>( 
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType> 
    (mapStateToProps, {logoutTC})
)(HeaderContainer)