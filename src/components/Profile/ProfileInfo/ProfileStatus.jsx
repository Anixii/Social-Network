
import { useEffect, useState } from "react"
const ProfileStatus = ({updateStatusThunkC,...props})=>{  
    const [editMode, setEditMode] = useState(false) 
    const [status, setStatus] = useState(props.status) 
    useEffect(() =>{ 
        setStatus(props.status)
    },[props.status]) 
    const deactivedEditMode =() =>{ 
        setEditMode(false)
        updateStatusThunkC(status)
   }
   return( 
       <div> 
            {!editMode &&  <div onDoubleClick={() => setEditMode(true)}><span>{props.status || 'no Status'}</span></div>} 
            {editMode &&  <div><input onChange={(e)=> setStatus(e.target.value) } autoFocus={true} onBlur={deactivedEditMode} type="text" value={status} /></div>} 
                    
        </div> 
    )
}
export default ProfileStatus 