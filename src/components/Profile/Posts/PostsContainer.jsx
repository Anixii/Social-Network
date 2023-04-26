
import {addPostActionCreator} from '../../../redux/profileReducer'
import { connect } from 'react-redux'
import Posts from './Posts'


let mapStateToProps = (state) =>{ 
    return{ 
        post : state.postPage
    }
    } 
    let mapDispatchToProps = (dispatch) =>{ 
    return{ 
        addPost:  (text) =>{dispatch(addPostActionCreator(text))}    
    }
    }
const PostsContainer = connect( mapStateToProps,mapDispatchToProps)(Posts)
export default PostsContainer