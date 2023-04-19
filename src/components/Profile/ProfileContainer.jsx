 
import React from 'react'
import Profile from './Profile'
import axios from 'axios'; 
import { getUsersProfileThunkC } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; 
import { authAPI } from '../../api/api';
class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
        let userId = this.props.router.params.userId;
        this.props.getUsersProfileThunkC(userId)
    }
    render(){  
        console.log(this.props.router.params) 
        
        return( 
            <Profile {...this.props } profile={this.props.profile}/>
        )
}
}  

let mapStateToProps = (state) => ({ 
    profile: state.postPage.profile

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