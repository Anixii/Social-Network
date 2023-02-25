import s from './Posts.module.css' 
import MyPosts from './MyPosts/MyPosts' 
import React from 'react' 

function Posts(props){  
 

 
    let newPostElem = React.createRef()
     
    let addPost = () => { 
        props.addPost()


       
    }
   
    let onPostChange = () =>{ 
        let text = newPostElem.current.value;  
        props.updateNewPostText(text)
    } 



    const myPostElem = props.post.myPostItem.map(post => <MyPosts message={post.message} likes={post.likes}/>)
    return(
        <div className={s.post}>  
            <div > <textarea onChange={onPostChange} value={props.post.newPostText} ref={newPostElem}></textarea></div>
            <div className={s.item}><button onClick={addPost}>Add Post</button> </div> 
            <div className={s.itemPost}> 
                {myPostElem}
            </div> 
        </div>
    )
} 
export default Posts