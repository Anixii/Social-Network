import React from 'react';
import './App.css';   
import DialogsContainer from './components/Dialogs/DialogsContainer';
import Sidebar from './components/Sidebar/Side';  
import Header from './components/Header/Header'
import { Routes, Route} from 'react-router-dom'; 

import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

function App(props) {  

 return (  
  
    <div className='App'> 
    <Header/> 
    <Sidebar/> 
      <div className='wrapper'>  
      <Routes>
        <Route path='/profile/' element={<ProfileContainer />}> 
          <Route path=":userId?" element={<ProfileContainer/>}/>       
        </Route> 
        <Route path='/dialogs/*' element={<DialogsContainer />}/>  
        <Route path='/users/*' element={<UsersContainer/>}/>   
      </Routes>
      </div> 
      
    </div> 
  
 )
}

export default App;
