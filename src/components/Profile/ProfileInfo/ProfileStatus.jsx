// import React from "react"
import { useState } from "react"
// class ProfileStatus extends React.Component { 
    
//     state ={ 
//         editMode: false,  
//         status: this.props.status
//     } 
//     activedEditMode = ()=> {  
//         this.setState({editMode: true}) 
//     } 
//     deactivedEditMode = ()=>{ 
//         this.setState({editMode: false}) ;
//         this.props.updateStatusThunkC(this.state.status)
//     } 
//     onStatusChange = (e) =>{ 
//         this.setState({status: e.currentTarget.value})
//     } 
//     componentDidUpdate (prevProps, prevState) { 
//         if(prevProps.status !== this.props.status){ 
//             this.setState({ 
//                 status: this.props.status
//             })
//         }
//     }
//     render(){ 

//         return( 
//             <div> 
//                 {!this.state.editMode &&  <div onDoubleClick={this.activedEditMode}>{this.props.status || 'no Status'}</div>} 
//                 {this.state.editMode &&  <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivedEditMode} type="text" value={this.state.status} /></div>} 
            
//         </div>
//     )
// } 
// } 
const ProfileStatus = props =>{  
    const [editMode, setEditMode] = useState(false) 
    const [status, setStatus] = useState(props.status) 
    const deactivedEditMode =() =>{ 
    setEditMode(false)
    props.updateStatusThunkC(this.state.status)
   }
   return( 
       <div> 
            {!editMode &&  <div onDoubleClick={() => setEditMode(true)}>{props.status || 'no Status'}</div>} 
            {editMode &&  <div><input onChange={(e)=> setStatus(e.target.value) } autoFocus={true} onBlur={deactivedEditMode} type="text" value={status} /></div>} 
                    
        </div> 
    )
}
export default ProfileStatus 