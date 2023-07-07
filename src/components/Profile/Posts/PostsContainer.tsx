
import {PostItemType, addPostActionCreator} from '../../../redux/profileReducer'
import { connect } from 'react-redux'
import Posts from './Posts'
import { AppStateType } from '../../../redux/redux-store'

type MapStateToPropsType = { 
    post: Array<PostItemType>
}
let mapStateToProps = (state:AppStateType):MapStateToPropsType =>{ 
    return{ 
        post : state.postPage.myPostItem
    }
    } 
    let mapDispatchToProps = (dispatch:any) =>{ 
    return{ 
        addPost:  (text:string) =>{dispatch(addPostActionCreator(text))}    
    }
    }
const PostsContainer = connect( mapStateToProps,mapDispatchToProps)(Posts)
export default PostsContainer