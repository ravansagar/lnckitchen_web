import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { v4 } from 'uuid';
import eSewaIcon from 'assets/esewa.svg'; 

const ESewaPayment = ({food, total, delivery}) => {
    const [transactionUuid, setTransactionUuid] = useState(v4());
    console.log(import.meta.env.VITE_ESEWA_SECRET_KEY);
    const [formData, setFormData] = useState({
        amount: parseInt(food.price.slice(4)),
        tax_amount: '0',
        total_amount: total,
        transaction_uuid: transactionUuid,
        product_code: import.meta.env.VITE_ESEWA_MERCHANT_KEY,
        product_service_charge: '0',
        product_delivery_charge: delivery,
        success_url: import.meta.env.VITE_ESEWA_SUCCESS_URL,
        failure_url: import.meta.env.VITE_ESEWA_FALIURE_URL,
        signed_field_names: 'total_amount,transaction_uuid,product_code',
        signature: '',
        secret: import.meta.env.VITE_ESEWA_SECRET_KEY
    });
    console.log(formData.amount);
    console.log(formData.transaction_uuid);
    console.log(formData.product_code);
    console.log(formData.secret);
    useEffect(() => {
        generateSignature();
    }, [formData.amount, formData.transaction_uuid, formData.product_code, formData.secret]);

    const generateSignature = () => {
        const currentTime = new Date();
        const formattedTime = currentTime.toISOString().slice(2, 10).replace(/-/g, '') + '-' +
            currentTime.getHours() + currentTime.getMinutes() + currentTime.getSeconds();
        setFormData(prevState => ({
            ...prevState,
            transaction_uuid: formattedTime
        }));

        const { total_amount, transaction_uuid, product_code, secret } = formData;
        if(!total_amount || !transaction_uuid || !product_code || !secret){
            return;
        }
        const hash = CryptoJS.HmacSHA256(
            `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`,
            secret
        );
        const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
        setFormData(prevState => ({
            ...prevState,
            signature: hashInBase64
        }));
    };
    const buttonStyle = {
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        };
      
        const iconStyle = {
          marginLeft: '10px',
          border: 'none',
          height: '20px',
        };
      
        const buttonHoverStyle = {
          backgroundColor: '#45a049',
        };
    return (
        <form action={import.meta.env.VITE_ESEWA_API_URL} method="POST" target="_blank">
            <input type="hidden" id="amount" name="amount" value={formData.amount} />
            <input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount} />
            <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} />
            <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} />
            <input type="hidden" id="product_code" name="product_code" value={formData.product_code} />
            <input type="hidden" id="product_service_charge" name="product_service_charge" value={formData.product_service_charge} />
            <input type="hidden" id="product_delivery_charge" name="product_delivery_charge" value={formData.product_delivery_charge} />
            <input type="hidden" id="success_url" name="success_url" value={formData.success_url} />
            <input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url} />
            <input type="hidden" id="signed_field_names" name="signed_field_names" value={formData.signed_field_names} />
            <input type="hidden" id="signature" name="signature" value={formData.signature} />
            <input type="hidden" id="secret" name="secret" value={formData.secret} />
            <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Pay via&nbsp;
            <img src={eSewaIcon} style={iconStyle} alt="eSewa Icon"/>
          </button>
        </form>
    );
};

export default ESewaPayment;
