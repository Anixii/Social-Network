import React from "react"

class ProfileStatus extends React.Component { 
    state ={ 
        editMode: false,
    }
    render(){ 

        return( 
            <div> 
                {!this.state.editMode &&  <div>{this.props.status}</div>} 
                {this.state.editMode &&  <div><input type="text" value={this.props.status} /></div>} 
            
        </div>
    )
} 
} 
export default ProfileStatus