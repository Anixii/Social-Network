import s from './Posts.module.css' 
import MyPosts from './MyPosts/MyPosts' 
import React from 'react' 
import { Field, reduxForm } from 'redux-form'
import { maxLength, required } from '../../../utils/validators/validators'
import { Textarea } from '../../common/FormsControls'
function Posts(props){       
    const onSubmit = (dataObj) => { 
        props.addPost(dataObj.newPostText)    
    }
    const myPostElem = props.post.myPostItem.map(post => <MyPosts message={post.message} likes={post.likes}/>)
    return(
        <div className={s.post}>  
            <ReduxPostForm onSubmit={onSubmit}/>
            <div className={s.itemPost}> 
                {myPostElem}
            </div> 
        </div>
    )
}   
const PostForm = (props) => { 
    return( 
        <form onSubmit={props.handleSubmit} > 
             <div > <Field name='newPostText' component={Textarea} validate={[required, maxLength(10)]} ></Field></div>
            <div className={s.item}><button >Add Post</button> </div> 
        </form>
    )
} 
const ReduxPostForm = reduxForm({ 
    form: 'addPostForm'
})(PostForm)
export default Posts