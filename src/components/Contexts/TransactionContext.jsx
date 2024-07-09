import React, { createContext, useContext } from "react";
import { set, ref } from "firebase/database";
import { database } from "components/LoginSignUp/firebaseConfig"; 

const TransactionContext = createContext();

export const useTransaction = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
  const saveTransactionToFirebase = async (userId, transactionData) => {
    try {
      await set(ref(database, `transactions/${userId}/${transactionData.transactionUuid}`), transactionData);
    } catch (error) {
      console.error("Error saving transaction to Firebase:", error);
      throw error;
    }
  };

  const value = {
    saveTransactionToFirebase,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};