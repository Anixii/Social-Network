import s from './Posts.module.css' 
import MyPosts from './MyPosts/MyPosts' 
import React from 'react' 
import { useForm } from 'react-hook-form' 
const Posts = React.memo(({post,...props}) =>{       
        const myPostElem = post.myPostItem.map((post, index) => <MyPosts key={index+post} message={post.message} likes={post.likes}/>)
        return(
        <div className={s.post}>  
            <PostForm {...props}/>
            <div className={s.itemPost}> 
                {myPostElem}
            </div> 
        </div>
    )

})
const PostForm = (props )  => { 
    const onSubmit = (dataObj) => {  
        props.addPost(dataObj.newPostText)  
        reset()   
    }
    
    const {  
        register, 
        formState: { 
            errors, 
            isValid
        }, 
        handleSubmit, 
        reset
    } = useForm({ 
        mode: 'onBlur'
    })
    
    return( 
        <form onSubmit={handleSubmit(onSubmit)}> 
            <div><input type="text" {...register('newPostText', {
                minLength : { 
                value : 1, 
                message: 'Минимально 1 символ'
             }, maxLength:{ 
                 value: 15, 
                 message: 'Максимально 15 символов'
                } ,
            })} /></div> 
            {errors?.newPostText && <p>{errors?.newPostText?.message || 'Erorr'} </p>}       
            <input type="submit" disabled={!isValid}/> 
        </form>
    )

}

 export default Posts