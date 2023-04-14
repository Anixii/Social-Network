 
import React from 'react'
import Profile from './Profile'
import axios from 'axios'; 
import { setUsersProfile } from '../../redux/profileReducer';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
        let userId = this.props.router.params.userId;
         
        if(!userId){ 
            userId= 28741
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`) 
        .then(response =>{   
        
        this.props.setUsersProfile(response.data) 
        console.log(this.props)
    }) ;
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
export default connect(mapStateToProps, {setUsersProfile})(withRouter(ProfileContainer))