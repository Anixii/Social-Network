import { AddMessageForm } from "./AddMessageForm"
import { Messages } from "./Messages"
export const Chat:React.FC = () =>{ 
    return( 
        <> 
            <div>     
            <Messages/>
            </div> 

            <div> 
                <AddMessageForm/>     
            </div> 
        </>
    )
}