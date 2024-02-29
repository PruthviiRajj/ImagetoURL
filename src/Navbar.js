import React, { Component } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import Dashboard from './dashboard';
import firebase from 'firebase/compat/app';
import withRouter from './withrouter';

class Navbar extends Component {
    state = {  } 


    logout(){
        firebase.auth().signOut().then(() => {
            this.props.navigate('/login');
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    render() { 
        return (
        <nav class="navbar navbar-expand-lg" style={{backgroundColor:"#1B242E"}}>
            <div class="container-fluid">
                <Link to='/'  class="navbar-brand text-white" href="#">Home</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <Link to='/dashboard' class="nav-link active text-white" aria-current="page" href="#">Dashboard</Link>                                
                </div>
            </div>
            </div>
            <button type='button' onClick={this.logout.bind(this)} className='btn btn-outline-danger me-4' style={{float:'right'}}>LogOut</button>
      </nav>
        );
    }
}

export default withRouter(Navbar);