import React from "react"

class ProfileStatus extends React.Component { 
    state ={ 
        editMode: false,
    } 
    activedEditMode = ()=> {  
        this.setState({editMode: true}) 

    } 
    deactivedEditMode = ()=>{ 
        this.setState({editMode: false}) 
    }
    render(){ 

        return( 
            <div> 
                {!this.state.editMode &&  <div onDoubleClick={this.activedEditMode}>{this.props.status}</div>} 
                {this.state.editMode &&  <div><input autoFocus={true} onBlur={this.deactivedEditMode} type="text" value={this.props.status} /></div>} 
            
        </div>
    )
} 
} 
export default ProfileStatus