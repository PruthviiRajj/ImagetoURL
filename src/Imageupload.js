import React, { Component } from 'react';
import Navbar from './Navbar';
import './style.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { fire,storage } from './firebaseconfig';
import withRouter from './withrouter';
import ClipboardCopy from './clipboard';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";






class ImageUploadDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      previewURL: null,
      flag:0,
      url :null
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        var uid = user.uid;                                       
        // ...
      }else{
        this.props.navigate('/login');
      }
    });

  }
  
  

  // Handle file selection
  handleFileSelect = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedFile: file});

    // Generate preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ previewURL: reader.result });      
    };
    reader.readAsDataURL(file);
  };

  upload(){
    if(this.state.selectedFile !== null){
      const imageref = storage('/images/'+ this.state.selectedFile.name).put(this.state.selectedFile)
      .on("state_changed", alert("succes"),alert);

      imageref();

    } 
  }
  fetch(){
    const analytics = getAnalytics(fire);
    const auth = getAuth(fire);
    const database = getDatabase(fire);
    logEvent(analytics,'photo_link_clicked', {
      userId: auth.currentUser.uid,
      photoId: this.state.selectedFile.name, // replace with a unique identifier for the photo
    });

    // Log event when a user views the image
    logEvent(analytics,'image_viewed', {
      userId: auth.currentUser.uid,
      photoId: this.state.selectedFile.name, // replace with a unique identifier for the photo
    });

    const photoId = this.state.selectedFile.name;

    // Log event when a user clicks on the photo link
    firebase.database().ref(`users/${localStorage.getItem('uid')}/image`).set(true);

    // Log event when a user views the image
    firebase.database().ref(`analytics/${photoId}/views/${firebase.auth().currentUser.uid}`).set(true);
  }

  // Handle form submission (upload)
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event)
    this.setState({flag:1})    

  

    // Your upload logic goes here
    const { selectedFile } = this.state;    
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      if(this.state.selectedFile === null){
        return;}
        else{          
        storage.ref('/images/' + selectedFile.name).put(selectedFile)
        .on("state_changed", alert("succes"),alert,()=>{
          storage.ref("images").child(selectedFile.name).getDownloadURL()
          .then((url)=>{
          this.setState({url:url});
        })     
        })
            
        //   let data = {
        //     name : localStorage.getItem("name"),
        //     image : this.state.irl,
        //     }
        //     firebase.database().ref('images/' + localStorage.getItem('uid')).set(data);     
        // this.fetch();  

        }
      // You can send the file to your backend for storage and processing
      // Make sure to handle this part with your server-side logic
    } else {
      console.log('No file selected!');
    }
  };
  clipboard(){
    if(this.state.flag === 1 && this.state.previewURL !== null){
      // console.log(this.state.url)
      return <ClipboardCopy  textToCopy={this.state.url}/>
    }
    
  }

  render() {
    const { previewURL } = this.state;

    return (
      <div>   
        <Navbar unique={this.state.selectedFile}/>
        <div className='container mt-5 text-white'>
          <div className='row'>
            <div className='col-12'>
              <h2 style={{ marginLeft: 300 }}>Image Upload Dashboard</h2>
              <form onSubmit={this.handleSubmit} style={{ marginLeft: 300 }}>
                <div>
                  <input type="file" className='form-control' style={{ backgroundColor: "#151C24", color: "#787B7F" }} onChange={this.handleFileSelect} />
                </div>
                {previewURL && (
                  <div>
                    <h4>Preview:</h4>
                    <img src={previewURL} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                  </div>
                )}
                <div>
                  <button type="submit" className='btn mt-2' style={{ background: "#FF0083" }}>Upload Image</button>
                </div>
              </form>
              <div className='row'>
                <div className='col-12 mt-3' style={{ marginLeft: 300 }}>
                  {this.clipboard()}                 
                </div>
              </div>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ImageUploadDashboard);
