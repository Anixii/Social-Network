import { ChatMessagePropsType } from "./Messages"

export const Message:React.FC<ChatMessagePropsType> = ({message,userId,userName,photo}) =>{ 
    return( 
        <> 
            <div><img src={photo} alt="" /></div>  
            <div> 
               NickName  {userName}
            </div> 
            <div> 
                {message}
            </div>

        </>
    )
}