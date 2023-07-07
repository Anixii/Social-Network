import s from './Posts.module.css' 
import MyPosts from './MyPosts/MyPosts' 
import React from 'react' 
import { useForm } from 'react-hook-form' 
import { PostItemType } from '../../../redux/profileReducer'
type PropsType = { 
    post: Array<PostItemType> 
    addPost:(text:string) => void
} 
const Posts:React.FC<PropsType> = React.memo(({post,...props}) =>{       
        const myPostElem = post.map((post, index) => <MyPosts key={index + post.id} message={post.message} likes={post.likes}/>)
        return(
        <div className={s.post}>  
            <PostForm {...props}/>
            <div className={s.itemPost}> 
                {myPostElem}
            </div> 
        </div>
    )

}) 
type PostFormType = { 
    addPost:(text:string) => void
} 
type FormValuesType = { 
    newPostText:string
}
const PostForm:React.FC<PostFormType> = (props )  => { 
    const onSubmit = (dataObj:FormValuesType) => {  
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
    } = useForm<FormValuesType>({ 
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