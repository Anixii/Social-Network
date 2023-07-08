import React, { useEffect,lazy, Suspense,FC } from 'react';
import './App.css';   
import Sidebar from './components/Sidebar/Side';  
import { Routes, Route,BrowserRouter } from 'react-router-dom'; 
import store, { AppStateType } from './redux/redux-store';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import {  connect, Provider } from 'react-redux';
import { initializeTC } from './redux/app-reducer';
import Preloader from './components/common/Preloader';
const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = lazy(() => import('./components/Dialogs/DialogsContainer')) 

type MapDispatchToPropsType = { 
  initializeTC:()=>void,
} 
type MapStateToPropsType = ReturnType< typeof mapStateToProps> 
type PropsType = MapDispatchToPropsType & MapStateToPropsType
const App:FC<PropsType> = (props) => {  
    useEffect(()=> { 
      props.initializeTC()
    },[]) 
    if(!props.initialized){ 
      return <Preloader/>
    }
 return (  
    <div className='App'> 
    <HeaderContainer/>
     <Sidebar /> 
       <div className='wrapper'>  
       <Suspense fallback={<div>Load...</div>}> 
       <Routes>
         <Route path='/profile/' element={<ProfileContainer />}> 
           <Route path=":userId?" element={<ProfileContainer/>}/>       
         </Route>  
         <Route path='/login'  element={<Login/>}/>
         <Route path='/dialogs/*' element={<DialogsContainer />}/>  
         <Route path='/users/*' element={<UsersContainer/>}/>   
       </Routes>
       </Suspense> 
       </div> 
    </div> 
 )
}
const mapStateToProps = (state:AppStateType) =>{ 
  return{ 
    initialized: state.app.initialized
  }
} 
const AppContainer = connect<MapStateToPropsType,MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {initializeTC})(App);

const MainApp= () =>{ 
  return( 
  <BrowserRouter> 
  <Provider store={store}>
  <AppContainer />  
  </Provider>
  </BrowserRouter>
  )
} 
export default MainApp