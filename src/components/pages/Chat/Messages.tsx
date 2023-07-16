import { useEffect, useState } from "react"
import { ws } from "./ChatPage"
import { Message } from "./Message"

export type ChatMessagePropsType = { 
    message: string 
    photo:string 
    userId: number 
    userName: string
} 
export const Messages:React.FC = () =>{  
    const [message, setMessages] = useState<Array<ChatMessagePropsType>>([]) 
    useEffect(()=> { 
        ws.addEventListener('message', (e)=>{ 
            console.log(JSON.parse(e.data));
            
        })
     }) 
    return( 
        <> 
            <div> 
                {message.map(item => <Message message={item.message} userId={item.userId} userName={item.userName} photo={item.photo} />)}
            </div>
        </>
    )
}