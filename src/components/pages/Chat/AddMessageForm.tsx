import { useState } from "react"
import { ws } from "./ChatPage"

export const AddMessageForm:React.FC = () =>{ 
    const [message, setMessage] = useState('') 
    const onSubmit = () =>{ 
        if(!message) return 
        ws.send(message)
        setMessage('')
    } 
    return( 
        <> 
            <form> 
                <input type="text" onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
                <button onClick={onSubmit}>Send</button> 
            </form>
        </>
    )
}