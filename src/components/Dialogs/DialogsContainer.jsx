import Dialogs from './Dialogs'
import { addMessageActionCreator} from '../../redux/dialogsReducer' 
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/AuthRedirect'
import { compose } from 'redux'
let mapStateToProps = (state) =>{  
return{ 
    state : state.dialogPage, 
}}  
let mapDispatchToProps = (dispatch) =>{ 
    return{  
    addMessage:  (text) =>{dispatch(addMessageActionCreator(text))}    
}}
const DialogsContainer = compose(  
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
export default DialogsContainer