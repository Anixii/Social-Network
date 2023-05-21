import React, { useEffect } from 'react';
import './App.css';   
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Sidebar from './components/Sidebar/Side';  
import { Routes, Route, } from 'react-router-dom'; 

import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import {  connect } from 'react-redux';
import { initializeTC } from './redux/app-reducer';
import Preloader from './components/common/Preloader';


function App(props) {  
    useEffect(()=> { 
      props.initializeTC()
    },[]) 
    if(!props.initialized){ 
      return <Preloader/>
    }
 return (  
  

    <div className='App'> 
    <HeaderContainer/>
    <Sidebar/> 
      <div className='wrapper'>  
      <Routes>
        <Route path='/profile/' element={<ProfileContainer />}> 
          <Route path=":userId?" element={<ProfileContainer/>}/>       
        </Route>  
        <Route path='/login'  element={<Login/>}/>
        <Route path='/dialogs/*' element={<DialogsContainer />}/>  
        <Route path='/users/*' element={<UsersContainer/>}/>   
      </Routes>
      </div> 
      
    </div> 
 )
}
const mapStateToProps = state =>{ 
  return{ 
    initialized: state.app.initialized
  }
} 
//export default App
export default connect(mapStateToProps, {initializeTC})(App);
