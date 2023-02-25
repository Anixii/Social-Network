
import Dialogs from './Dialogs'
import React from 'react'
import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer' 

import { connect } from 'react-redux'
// function DialogsContainer(props){  
    

//     return( 
//     <StoreContext.Consumer> 
//         {  
//         (store) =>{ 
//     let state = store.getState().dialogPage
//     const addMessage = () =>{         
//         store.dispatch(addMessageActionCreator())
//     }
//     const onMessageChange = (text) =>{       
//         store.dispatch(updateNewMessageActionCreator(text))
//     } 
//     return <Dialogs updateNewMessage={onMessageChange} addMessage = {addMessage} state={state}/> 
//     } 
//     }  
//     </StoreContext.Consumer>
//     )
// }  

 
let mapStateToProps = (state) =>{  

return{ 
    state : state.dialogPage
}
} 
let mapDispatchToProps = (dispatch) =>{ 
    return{  
    updateNewMessage: (text) =>{dispatch(updateNewMessageActionCreator(text))}, 
    addMessage:  () =>{dispatch(addMessageActionCreator())}    
}
}
const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(Dialogs)
export default DialogsContainer