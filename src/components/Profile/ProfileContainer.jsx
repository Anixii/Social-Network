 
import React from 'react'
import Profile from './Profile'

import { getUsersProfileThunkC } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { withAuthRedirect } from '../../hoc/AuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
        let userId = this.props.router.params.userId;
        this.props.getUsersProfileThunkC(userId)
    }
    render(){   
        return( 
            <Profile {...this.props } profile={this.props.profile} />
        )
}
}  


let mapStateToProps = (state) => ({ 
    profile: state.postPage.profile,

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
    connect(mapStateToProps, {getUsersProfileThunkC}), 
    withRouter,  
    withAuthRedirect
)(ProfileContainer) 