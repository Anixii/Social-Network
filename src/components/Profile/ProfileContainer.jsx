 
import React from 'react'
import Profile from './Profile'
import axios from 'axios'; 
import { setUsersProfile } from '../../redux/profileReducer';
import { connect } from 'react-redux';
class ProfileContainer extends React.Component{ 
    componentDidMount(){ 
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/5`) 
        .then(response =>{   
        debugger
        this.props.setUsersProfile(response.data) 
        console.log(response.data)
    }) ;
    }
    render(){  
        console.log('rendering') 
        
        return( 
            <Profile {...this.props } profile={this.props.profile}/>
        )
}
}  

let mapStateToProps = (state) => ({ 
    profile: state.postPage.profile

}) 
export default connect(mapStateToProps, {setUsersProfile})(ProfileContainer)