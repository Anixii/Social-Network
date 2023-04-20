import React from 'react';
import './App.css';   
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Sidebar from './components/Sidebar/Side';  
import { Routes, Route} from 'react-router-dom'; 

import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';

function App(props) {  

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

export default App;
