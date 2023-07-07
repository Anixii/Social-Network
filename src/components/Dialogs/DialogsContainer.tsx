import Dialogs from './Dialogs' 
import {FC} from 'react'
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
type PropsType = MapDispatchToPropsType & MapStateToPropsType
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
const DialogsContainer = compose(
    connect<MapStateToPropsType,MapDispatchToPropsType, {},AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
export default DialogsContainer