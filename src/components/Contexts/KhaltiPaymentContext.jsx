// KhaltiPaymentContext.js

import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const KhaltiPaymentContext = createContext();

export const useKhaltiPayment = () => {
  return useContext(KhaltiPaymentContext);
};

export const KhaltiPaymentProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const initiatePayment = async (totalAmount, productId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://khalti.com/api/payment/initiate",
        {
          total_amount: totalAmount,
          product_id: productId,
        }
      );
      console.log("Payment initiated successfully:", response.data);
    } catch (error) {
      console.error("Error initiating payment:", error);
      setError(error.message || "Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    initiatePayment,
  };

  return (
    <KhaltiPaymentContext.Provider value={value}>
      {children}
    </KhaltiPaymentContext.Provider>
  );
};
