import { auth } from "./firebaseConfig";
import { signInWithPhone } from "./loginWithPhone";
import { signInWithEmailAndPassword } from "firebase/auth";

const handleSubmit = async (e, formData, showAlert, navigate) => {
    e.preventDefault();
    const isEmail = /\S+@\S+\.\S+/;
    const identifier = formData.identifier;
    const password = formData.password;
    if (!identifier || !password) {
      showAlert('Please enter both email/phone and password.', 'error');
      return;
    }
    try {
      if (!isEmail.test(identifier)) {
        const signInSuccessful = await signInWithPhone(identifier, password);
        if (signInSuccessful) {
          navigate('/');
        } else {
          showAlert('Sign-in failed. Please try again.', 'error');
        }
      } else {
        await signInWithEmailAndPassword(auth, identifier, password);
        navigate('/');
      }
    } catch (error) {
      showAlert(`Sign-in error: ${error.message}`, 'error');
    }
  };
  
  export default handleSubmit;
  