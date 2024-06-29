// import { useState, useEffect } from "react";
// import CryptoJS from "crypto-js";
// import { v4 as uuidV4 } from "uuid";
// import { useTransaction } from "components/Contexts/TransactionContext";

// const PayViaKhalti = ({ label, description, totalPrice, deliveryCharge, user }) => {
//     const [signature, setSignature] = useState("");
//     const [transactionUuid, setTransactionUuid] = useState("");
//     const { saveTransactionToFirebase } = useTransaction();

//     useEffect(() => {
//         const newUuid = uuidV4();
//         setTransactionUuid(newUuid);
//     }, [label]);

//     useEffect(() => {
//         const generateSignature = () => {
//             const secret = "test_secret_key_09852c3d19bd4013bf17899bdf56b6d4"; 
//             const message = `total_amount=${totalPrice + deliveryCharge}&txAmt=${totalPrice}&psc=0&pdc=${deliveryCharge}&scd=KHALTITEST&pid=${uuidV4()}`;
//             const hash = CryptoJS.HmacSHA256(message, secret);
//             const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
//             setSignature(hashInBase64);
//         };

//         generateSignature();
//     }, [totalPrice, deliveryCharge]);

//     const handleKhaltiPayment = async () => {
//         const khaltiUrl = "https://a.khalti.com/api/v2/epayment/initiate/";

//         try {
//             await saveTransactionToFirebase(user.uid, {
//                 label: label,
//                 description: description,
//                 amount: totalPrice,
//                 deliveryCharge: deliveryCharge,
//                 transactionUuid: transactionUuid,
//                 status: "pending",
//                 method: "Khalti",
//                 date: new Date().toISOString().slice(0, 10),
//             });

//             window.location.href = `${khaltiUrl}${transactionUuid}`;
//         } catch (error) {
//             console.error("Error processing Khalti payment:", error);
//         }
//     };

    

//     return (
//         <div>
//             <button onClick={handleKhaltiPayment} style={{ padding: "1em", backgroundColor: "#FF6600", color: "white", border: "none", cursor: "pointer" }}>
//                 Pay with Khalti
//             </button>
//         </div>
//     );
// };

// export default PayViaKhalti;

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { v4 as uuidV4 } from "uuid";
import { useTransaction } from "components/Contexts/TransactionContext";

const PayViaKhalti = ({ label, description, totalPrice, deliveryCharge, user }) => {
  const [signature, setSignature] = useState("");
  const [transactionUuid, setTransactionUuid] = useState("");
  const { saveTransactionToFirebase } = useTransaction();

  useEffect(() => {
    const newUuid = uuidV4();
    setTransactionUuid(newUuid);
  }, [label]);

  useEffect(() => {
    const generateSignature = () => {
      const secret = "YOUR_KHALTI_SECRET_KEY";
      const message = `amount=${totalPrice + deliveryCharge}&product_identity=${uuidV4()}&product_name=${label}&product_url=https://example.com/product&return_url=https://example.com/return&merchant_extra={}`;
      const hash = CryptoJS.HmacSHA256(message, secret);
      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
      setSignature(hashInBase64);
    };

    generateSignature();
  }, [totalPrice, deliveryCharge]);

  const handleKhaltiPayment = async () => {
    const khaltiUrl = "https://a.khalti.com/api/v2/epayment/initiate/";
    const publicKey = "test_public_key_05473b5817a14e76ba897b05f990be28";
    const secretKey = "test_secret_key_09852c3d19bd4013bf17899bdf56b6d4";
  
    const message = `amount=${totalPrice + deliveryCharge}&txAmt=${totalPrice}&psc=0&pdc=${deliveryCharge}&scd=KHALTITEST&pid=${uuidV4()}`;
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    const checksum = CryptoJS.enc.Base64.stringify(hash);
  
    console.log("Checksum:", checksum);
  
    try {
      await saveTransactionToFirebase(user.uid, {
        label: label,
        description: description,
        amount: totalPrice,
        deliveryCharge: deliveryCharge,
        transactionUuid: transactionUuid,
        status: "pending",
        method: "Khalti",
        date: new Date().toISOString().slice(0, 10),
      });
  
      const headers = {
        "Authorization": `Khalti-Checksum ${checksum}`,
        "Public-Key": publicKey,
      };
  
      console.log("Headers:", headers);
  
      const url = `${khaltiUrl}?amount=${totalPrice + deliveryCharge}&txAmt=${totalPrice}&psc=0&pdc=${deliveryCharge}&scd=KHALTITEST&pid=${uuidV4()}`;
  
      window.location.href = url;
    } catch (error) {
      console.error("Error processing Khalti payment:", error);
    }
  };

  return (
    <div>
      <button onClick={handleKhaltiPayment} style={{ padding: "1em", backgroundColor: "#FF6600", color: "white", border: "none", cursor: "pointer" }}>
        Pay with Khalti
      </button>
    </div>
  );
};

export default PayViaKhalti;