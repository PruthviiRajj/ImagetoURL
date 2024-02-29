import React, { Component } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';
import withRouter from './withrouter';
import "./login.css";

class Login extends Component {
    state = {  } 

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/v8/firebase.User
              var uid = user.uid;    
              this.props.navigate('/');                           
              // ...
            }
          });
    }

    click(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                console.log(result.user);
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user);
                //Register new user to firebase                
                localStorage.setItem("name",user.displayName);
                localStorage.setItem("dp",user.photoURL);
                localStorage.setItem("uid",user.uid);
                this.props.navigate('/');
                
                let data = {
                    name : user.displayName,
                    uid: user.uid
                }
                firebase.database().ref('users/' + user.uid).set(data);
                
                // IdP data available in result.additionalUserInfo.profile.
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                console.log(errorMessage)
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    render() { 
        return (
            <div>                
                <div className='container' style={{marginTop:200}}>
                    <div className='row'>
                        <div className='col-6 offset-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <h1 className='display-4'>
                                        Sign in with google
                                    </h1>
                                    <button onClick={this.click.bind(this)} className='btn btn-outline-secondary btn-lg btn-block mt-4'>Sign in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>     
        );
    }
}
 
export default withRouter(Login);