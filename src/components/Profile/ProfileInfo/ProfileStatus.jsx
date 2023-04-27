import React from "react"

class ProfileStatus extends React.Component { 
    
    state ={ 
        editMode: false,  
        status: this.props.status
    } 
    activedEditMode = ()=> {  
        this.setState({editMode: true}) 

    } 
    deactivedEditMode = ()=>{ 
        this.setState({editMode: false}) ;
        this.props.updateStatusThunkC(this.state.status)
    } 
    onStatusChange = (e) =>{ 
        this.setState({status: e.currentTarget.value})
    } 
    componentDidUpdate (prevProps, prevState) { 
        if(prevProps.status !== this.props.status){ 
            this.setState({ 
                status: this.props.status
            })
        }
    }
    render(){ 

        return( 
            <div> 
                {!this.state.editMode &&  <div onDoubleClick={this.activedEditMode}>{this.props.status || 'no Status'}</div>} 
                {this.state.editMode &&  <div><input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivedEditMode} type="text" value={this.state.status} /></div>} 
            
        </div>
    )
} 
} 
export default ProfileStatus