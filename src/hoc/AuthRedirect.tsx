import React  from "react" 
import { Navigate } from "react-router-dom"
import { connect } from "react-redux"
import { AppStateType } from "../redux/redux-store"
// let mapStateToPropsRedirect = (state:AppStateType) => ({ 
//     isAuth: state.auth.isAuth
// })   
// type MapStateToPropsType = { 
//     isAuth: boolean
// }
// export function withAuthRedirect<WCP> (Component:React.ComponentType){ 
//     const RedirectComponent:React.FC<MapStateToPropsType> = (props)=>{ 
//             let {isAuth} = props 
//             if(!isAuth) return <Navigate to={'/login'}/>  
//             return <Component />
//         } 
//     let ConnectAuthRedirectComponent = connect<MapStateToPropsType,{},WCP, AppStateType>(mapStateToPropsRedirect)(RedirectComponent)
//     return ConnectAuthRedirectComponent 
// }

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
       isAuth: state.auth.isAuth
    } as MapPropsType
 }
 
 type MapPropsType = { isAuth: boolean }
 
 type DispatchPropsType = {
 }
 
 // WCP это - WrappedComponentProps
 
 export function withAuthRedirect<WCP  extends JSX.IntrinsicAttributes>(WrappedComponent: React.ComponentType<WCP>) {
 
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
 
       let {isAuth, ...restProps} = props
 
       if (!isAuth) {
          return <Navigate to={'/login'} />
       }
 
       return <WrappedComponent {...restProps as WCP} />
    }
 
    return connect<MapPropsType, DispatchPropsType,
       WCP, AppStateType>(
       mapStateToPropsForRedirect, {})(RedirectComponent)
 }