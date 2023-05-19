 
import React from 'react'
import Profile from './Profile'

import { getUsersProfileThunkC,getStatusThunkC, updateStatusThunkC } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import {  useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { compose } from 'redux';
import { getAuthSelector, getProfileSelector, getStatusSelector, getUserIDSelector } from '../../redux/profile-Selector';
import { useEffect } from 'react';
class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
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
    render(){    
        console.log('RenderC');
        return( 
            <Profile {...this.props } profile={this.props.profile} />
        )
}
}  

  

let mapStateToProps = (state) => ({ 
    profile: getProfileSelector(state),
    status: getStatusSelector(state), 
    loginnedUserId: getUserIDSelector(state), 
    isAuth: getAuthSelector(state)
})   


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
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



export default compose( 
    connect(mapStateToProps, {getUsersProfileThunkC, getStatusThunkC,updateStatusThunkC}), 
    withRouter,  
    // withAuthRedirect
)(ProfileContainer) 