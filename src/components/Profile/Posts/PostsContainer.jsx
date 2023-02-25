
import React from 'react' 
import {addPostActionCreator, updateNewPostTextActionCreator} from '../../../redux/profileReducer'
import { connect } from 'react-redux'
import Posts from './Posts'


let mapStateToProps = (state) =>{ 
    return{ 
        post : state.postPage
    }
    } 
    let mapDispatchToProps = (dispatch) =>{ 
    return{ 
        updateNewPostText: (text) =>{ dispatch(updateNewPostTextActionCreator(text))}, 
        addPost:  () =>{dispatch(addPostActionCreator())}    
    }
    }
const PostsContainer = connect( mapStateToProps,mapDispatchToProps)(Posts)
export default PostsContainer