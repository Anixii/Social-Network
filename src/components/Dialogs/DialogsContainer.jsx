
import Dialogs from './Dialogs'

import { addMessageActionCreator, updateNewMessageActionCreator } from '../../redux/dialogsReducer' 
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/AuthRedirect'
import { compose } from 'redux'

let mapStateToProps = (state) =>{  
return{ 
    state : state.dialogPage, 
}
}  
let mapDispatchToProps = (dispatch) =>{ 
    return{  
    updateNewMessage: (text) =>{dispatch(updateNewMessageActionCreator(text))}, 
    addMessage:  () =>{dispatch(addMessageActionCreator())}    
}
}
// compose(  
//     connect(mapStateToProps,mapDispatchToProps),
//     withAuthRedirect
// )(Dialogs)
// let AuthRedirectComponent = withAuthRedirect(Dialogs)
 
// const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent)
// export default DialogsContainer 


 
const DialogsContainer = compose(  
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
export default DialogsContainer