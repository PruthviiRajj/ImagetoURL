import React, { Component } from 'react';
import Navbar from './Navbar';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { analytics } from './firebaseconfig';

class Dashboard extends Component {
    state = {  } 

    fetchAnalytics(){
        // Fetch analytics data for a specific photo
        const photoId = this.props.unique;
        const analyticsRef = firebase.database().ref(`analytics/${photoId}`);

        analyticsRef.child('clicks').once('value').then((clicksSnapshot) => {
        const clicksCount = clicksSnapshot.numChildren();
        console.log(`Number of clicks: ${clicksCount}`);
        });

        analyticsRef.child('views').once('value').then((viewsSnapshot) => {
        const viewsCount = viewsSnapshot.numChildren();
        console.log(`Number of views: ${viewsCount}`);
});

    }

    render() { 
        return (
            <div>
                <Navbar/>
                {this.fetchAnalytics()}
            </div>
        );
    }
}
 
export default Dashboard;