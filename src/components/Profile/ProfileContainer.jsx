 
import React from 'react'
import Profile from './Profile'

import { getUsersProfileThunkC } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'; 

class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
        let userId = this.props.router.params.userId;
        this.props.getUsersProfileThunkC(userId)
    }
    render(){  

        if(!this.props.isAuth) {
            return <Navigate to={'/login'}/>
        }
        
        return( 
            <Profile {...this.props } profile={this.props.profile} />
        )
}
}  

let mapStateToProps = (state) => ({ 
    profile: state.postPage.profile,
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
export default connect(mapStateToProps, {getUsersProfileThunkC})(withRouter(ProfileContainer))