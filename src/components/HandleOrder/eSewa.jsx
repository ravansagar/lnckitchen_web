// import React, { useState, useEffect } from "react";
// import CryptoJS from "crypto-js";
// import { v4 as uuidv4 } from "uuid";
// import { IconButton } from "@mui/material";
// import eSewaIcon from "assets/esewa.svg";
// import { useTransaction } from "components/Contexts/TransactionContext";

// const PayViaEsewa = ({ label, description, totalPrice, deliveryCharge, user }) => {
//   const [transactionUuid, setTransactionUuid] = useState("");
//   const { saveTransactionToFirebase } = useTransaction();
//   const su = encodeURIComponent(`https://esewa.com.np`);
//   const fu = encodeURIComponent(`https://google.com`);
//   useEffect(() => {
//         const newUuid = uuidv4();
//         setTransactionUuid(newUuid);
//   }, [label]);
//   const secret = "8gBm/:&EnhH.1/q";
//   const message = `total_amount=${totalPrice}&transaction_uuid=${transactionUuid}&product_code=EPAYTEST`;
//   const hash = CryptoJS.HmacSHA256(message, secret);
//   const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
//   console.log(hashInBase64);
//   const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log("Clicked");
//         try {
//           await saveTransactionToFirebase(user.uid, {
//             label: label,
//             description: description,
//             amount: totalPrice,
//             deliveryCharge: deliveryCharge,
//             transactionUuid: transactionUuid,
//             status: "pending",
//             method: "eSewa",
//             date: new Date().toISOString().slice(0, 10),
//           });
//         } catch (error) {
//           console.error("Error processing eSewa payment:", error);
//         }
//       };
//   return (
    // <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
    // <input type="hidden" id="amount" name="amount" value={totalPrice-deliveryCharge} required />
    // <input type="hidden" id="tax_amount" name="tax_amount" value ="0" required />
    // <input type="hidden" id="total_amount" name="total_amount" value={totalPrice} required />
    // <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={transactionUuid} required />
    // <input type="hidden" id="product_code" name="produc_code" value ="EPAYTEST" required />
    // <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
    // <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={deliveryCharge} required />
    // <input type="hidden" id="success_url" name="success_url" value="https://esewa.com.np" required />
    // <input type="hidden" id="failure_url" name="failure_url" value="https://google.com" required />
    // <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
    // <input type="hidden" id="signature" name="signature" value={hashInBase64} required />
    // <input value="Submit" type="submit" />
    // </form>
//   );
// }

// export default PayViaEsewa;


const PayViaEsewa = () => {
  return (
<form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
    <input type="hidden" id="amount" name="amount" value="100" required />
    <input type="hidden" id="tax_amount" name="tax_amount" value ="10" required />
    <input type="hidden" id="total_amount" name="total_amount" value="110" required />
    <input type="hidden" id="transaction_uuid" name="transaction_uuid" value="ab14a8f2b02c3" required />
    <input type="hidden" id="product_code" name="produc_code" value ="EPAYTEST" required />
    <input type="hidden" id="product_service_charge" name="product_service_charge" value="0" required />
    <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
    <input type="hidden" id="success_url" name="success_url" value="https://esewa.com.np" required />
    <input type="hidden" id="failure_url" name="failure_url" value="https://google.com" required />
    <input type="hidden" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required />
    <input type="hidden" id="signature" name="signature" value="YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=" required />
    <input value="Submit" type="submit" />
    </form>
  );
};
export default PayViaEsewa;
