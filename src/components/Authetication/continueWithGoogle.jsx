import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { set, ref } from "firebase/database";
import { auth, database } from "./firebaseConfig";
import { Link } from "react-router-dom";
const googleAuthProvider = new GoogleAuthProvider();


const HandleGoogleSignIn = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;
    const profilePicUrl = user.photoURL || "";
    const displayName = user.displayName || user.email;
    const userRef = ref(database, `users/${user.uid}`);
    await set(userRef, {
      displayName,
      profilePicUrl,
    });
    return(
      <>
          <Link to={{
            pathname: '/',
            state: {id: 1, name: displayName, picture: profilePicUrl}
          }} ></Link>
      </>
      )
  } catch (error) {
    console.error(`Error signing in with Google: ${error.message}`);
  }
};

export default HandleGoogleSignIn;