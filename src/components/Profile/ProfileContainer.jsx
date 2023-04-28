 
import React from 'react'
import Profile from './Profile'

import { getUsersProfileThunkC,getStatusThunkC, updateStatusThunkC } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
        let userId = this.props.router.params.userId; 
        if(!userId){ 
            userId= this.props.loginnedUserId
        }else { 
            // return <Navigate to={'users'}/>
        }
        this.props.getUsersProfileThunkC(userId)
        this.props.getStatusThunkC(userId)
    }
    render(){   
        return( 
            <Profile {...this.props } profile={this.props.profile} />
        )
}
}  


let mapStateToProps = (state) => ({ 
    profile: state.postPage.profile,
    status: state.postPage.status, 
    loginnedUserId: state.auth.userId, 
    isAuth: state.auth.isAuth
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
//    withAuthRedirect
)(ProfileContainer) 