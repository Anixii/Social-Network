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
        console.log('e');
        
        ws.addEventListener('message', (e:MessageEvent)=>{ 
            console.log(JSON.parse(e.data)); 
            let newMessages = JSON.parse(e.data) 
            setMessages((prev) =>[...prev, ...newMessages])
        }) 
     },[])  

    return( 
        <> 
            <div> 
                {message.map((item,index) => <Message key={index + item.userId} message={item.message} userId={item.userId} userName={item.userName} photo={item.photo} />)}
            </div>
        </>
    )
}