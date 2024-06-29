import React from "react";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAlert } from "components/Contexts/AlertContext";

const SignOut = () => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    signOut(auth)
        .then(() => {
            showAlert("Signed out successfull.", "success");
            navigate("/");
        })
        .catch((error) => {
            showAlert(`Error sigining out, ${error}`, "error");
        });
};
export default SignOut;