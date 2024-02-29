import React, { Component } from 'react';
import Navbar from './Navbar';
import ImageUploadDashboard from './Imageupload';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './dashboard';

class App extends Component {
    state = {  } 
    render() { 
        return (
        <switch>
            <Routes>
                <Route path='/' Component={ImageUploadDashboard}></Route>
                <Route path='/login' Component={Login}></Route>
                <Route path='/dashboard' Component={Dashboard}></Route>
            </Routes>
        </switch>
        );
    }
}
 
export default App;