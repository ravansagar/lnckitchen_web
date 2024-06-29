import { ref, get } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from './firebaseConfig';

const signInWithPhone = async (phoneNumber, password, navigate) => {
  try {
    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      let email = null;

      snapshot.forEach((userSnapshot) => {
        const userData = userSnapshot.val();
        const phone = userData.phone;
        const userEmail = userData.email;

        if (phone === phoneNumber) {
          email = userEmail;
          console.log(email);
        }
      });

      if (email) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
        throw new Error('Phone number not found.');
      }
    } else {
      throw new Error('No users found.');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { signInWithPhone };
