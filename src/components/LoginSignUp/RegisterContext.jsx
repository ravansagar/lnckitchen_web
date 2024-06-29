import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set, getDatabase } from 'firebase/database';
import { auth } from './firebaseConfig';

const CreateUser = async (email, password, name, phone, address, showAlert) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (name || phone || address) {
      await updateProfile(user, {
        displayName: name || user.displayName,
        phoneNumber: phone || user.phoneNumber,
        address: address || user.address,
      });
    }

    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}`);
    await set(userRef, {
      email,
      name,
      phone,
      address,
    });

    showAlert(`${name.split(' ')[0]} your account created successfully.`, 'success');
    return user;
  } catch (error) {
    showAlert(`Account creation failed.`, 'error');
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const Validation = (...props) =>  {
  const [valid, setValid] = useState([]);
  setValid(...props);
  return  valid;
};

export { CreateUser, Validation };
