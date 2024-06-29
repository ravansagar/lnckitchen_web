import { auth } from "components/LoginSignUp/firebaseConfig";
const handleSignOut = () => {
    auth().signOut().then(() => {
        console.log('User signed out successfully.');
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
};

export default handleSignOut;