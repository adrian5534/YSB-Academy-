// app.js

// Import Amplify 
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'; // Import Amplify AWS Configuration

// Initialize Amplify
Amplify.configure(awsconfig);

document.addEventListener('DOMContentLoaded', function() {
    
    // AWS Amplify Backend API Endpoint
    const apiEndpoint = 'https://3v47g9v5u2.execute-api.us-east-2.amazonaws.com'
});
    // Function to fetch data from the backend API 
        function fetchData() {
            fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => { console.log('data from Lambda REST API: ', data) })
           
            // Handle the data as needed, update your HTML, etc.
            .catch(error =>{
                console.error('Error fecching data: ', error)
            });
        }

        // Handle sign-in button click 
        document.getElementById('signInButton').addEventListener('click', async () => {
            try {
                await Auth.signIn(username, password);
                console.log('User signed in');
            } catch (error) {
                console.log('Error signing in: ', error);
            }
        });

        // Handle log-out button click
        document.getElementById('signOutButton').addEventListener('click', async () => {
            try {
                await Auth.signOut();
                console.log('User signed out');
            } catch (error) {
                console.log('Error signing out: ', error);
            }
        });