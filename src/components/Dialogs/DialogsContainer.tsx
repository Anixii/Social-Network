import Dialogs from './Dialogs' 
import { AddMessageType, addMessageActionCreator } from '../../redux/dialogsReducer'
import { connect } from 'react-redux'
import { withAuthRedirect } from '../../hoc/AuthRedirect'
import { Dispatch, compose } from 'redux'  
import { initialStateType as DialogStateType } from '../../redux/dialogsReducer'
import { AppStateType } from '../../redux/redux-store'
type MapStateToPropsType = { 
    state: DialogStateType
} 
type MapDispatchToPropsType = { 
    addMessage: (text:string) => void
} 
const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        state: state.dialogPage,
    }
}
const mapDispatchToProps = (dispatch:Dispatch<AddMessageType>):MapDispatchToPropsType => {
    return {
        addMessage: (text) => { dispatch(addMessageActionCreator(text)) }
    }
}
const DialogsContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType,MapDispatchToPropsType, {},AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
export default DialogsContainer