import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransaction } from 'components/Contexts/TransactionContext';
import { ref, get, update } from "firebase/database";
import { database } from 'components/LoginSignUp/firebaseConfig';
import './loader.css';

const ESewaSuccessFrom = ({ user }) => {
  const [payload, setPayload] = useState(null);
  const navigate = useNavigate();
  const { saveTransactionToFirebase } = useTransaction();
  const isExecuted = useRef(false);

  useEffect(() => {
    const decodePayloadFromURL = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const base64EncodedPayload = urlParams.get('data');
      if (base64EncodedPayload) {
        try {
          const decodedPayload = atob(base64EncodedPayload);
          const parsedPayload = JSON.parse(decodedPayload);
          setPayload(parsedPayload);
          console.log('Decoded payload:', parsedPayload);
        } catch (error) {
          console.error('Error decoding or parsing payload:', error);
        }
      }
    };

    if (!isExecuted.current) {
      isExecuted.current = true;
      decodePayloadFromURL();
    }
  }, []);

  useEffect(() => {
    const saveAndNavigate = async () => {
      if (!user) {
        console.warn('User is not defined.');
        return;
      }

      if (payload) {
        console.log('Payload exists:', payload);
        const orderRef = ref(database, `transactions/${user.uid}`);
        try {
          const orderSnapshot = await get(orderRef);
          const orderData = orderSnapshot.val();
          console.log('Order data from Firebase:', orderData);

          let itemExists = false;
          let itemKey = null;
          if (orderData) {
            for (let key in orderData) {
              console.log('Checking transactionUuid:', orderData[key].transactionUuid);
              if (orderData[key].transactionUuid === payload.transaction_uuid) {
                itemExists = true;
                itemKey = key;
                break;
              }
            }
          }

          if (itemExists) {
            const transactionRef = ref(database, `transactions/${user.uid}/${itemKey}`);
            await update(transactionRef, { status: payload.status });
            console.log('Transaction status updated successfully.');
          } else {
            console.warn('Transaction not found.');
          }

          navigate('/profile?tab=2');
        } catch (error) {
          console.error('Error Updating Status:', error);
        }
      } else {
        console.warn('Payload is not set.');
      }
    };

    saveAndNavigate();
  }, [payload, user, navigate, saveTransactionToFirebase]);

  return (
    <div className="loader-container" style={{marginTop: '-100px'}}>
      <div className="loader"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default ESewaSuccessFrom;
