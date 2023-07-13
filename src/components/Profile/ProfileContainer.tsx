 
import React from 'react'
import Profile from './Profile'

import { getUsersProfileThunkC,getStatusThunkC, updateStatusThunkC, savePhotoTC, saveProfileTC, ProfileType } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import {  useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { compose } from 'redux';
import { getAuthSelector, getProfileSelector, getStatusSelector, getUserIDSelector } from '../../redux/profile-Selector';
import { AppStateType } from '../../redux/redux-store';
type MapStateToPropsType = { 
    isAuth: boolean,  
    loginnedUserId: number 
    status: string 
    profile: ProfileType | null
} 
type MapDispatchToPropsType = { 
    getUsersProfileThunkC: (id:number | null) => void, 
    getStatusThunkC: (id:number) => void, 
    updateStatusThunkC: (status:string) => void,  
    savePhotoTC: (photo:any) => void, 
    saveProfileTC:(data: ProfileType) => void
}  
type OwnProps = { 
    router: any
}
type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnProps
class ProfileContainer extends React.Component<PropsType>{ 
    refrechProfile = () =>{ 
        let userId = this.props.router.params.userId; 
        if(!userId){  
            userId= this.props.loginnedUserId
            if(!userId){  
                this.props.router.navigate('/login')
            }
        }
        this.props.getUsersProfileThunkC(userId)
        this.props.getStatusThunkC(userId)
    } 
    componentDidMount(){ 
        this.refrechProfile()
    } 
    componentDidUpdate(prevProps: PropsType){  
        if(this.props.router.params.userId !== prevProps.router.params.userId){ 
            this.refrechProfile()
        }
    }
    render(){   
        return( 
            <Profile isOwner={!this.props.router.params.userId} savePhotoTC={this.props.savePhotoTC} saveProfileTC={this.props.saveProfileTC} status={this.props.status} profile={this.props.profile} updateStatusThunkC={this.props.updateStatusThunkC}  />
        )
}
}  

  

let mapStateToProps = (state:AppStateType):MapStateToPropsType => ({ 
    profile: getProfileSelector(state),
    status: getStatusSelector(state), 
    loginnedUserId: getUserIDSelector(state), 
    isAuth: getAuthSelector(state)
})   

function withRouter(Component:React.FC) {
    function ComponentWithRouterProp(props:any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams(); 
        
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
} 



export default compose<React.ComponentType>( 
    connect<MapStateToPropsType,MapDispatchToPropsType,OwnProps,AppStateType> 
    (mapStateToProps, {getUsersProfileThunkC, getStatusThunkC,updateStatusThunkC, savePhotoTC,saveProfileTC}), 
    withRouter,  
    // withAuthRedirect
)(ProfileContainer) 