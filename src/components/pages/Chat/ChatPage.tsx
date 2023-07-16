import React from 'react'
import { Chat } from './Chat';
export const ws = new WebSocket(`wss://social-network.samuraijs.com/handlers/ChatHandler.ashx`)
console.log(ws);

const ChatPage:React.FC = (props) => {
   
   
    return (
    <div> 
        <div> 
        <Chat/> 
        </div> 
        
    </div>
  )
}

export default ChatPage