import React from "react";
import { useAlert } from "./AlertContext";
import useCartItems from "components/ProfileDashboard/cartItems";
import { Button } from "@mui/material";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import HandleCart from "./addToCart";

const CartButton = ({ food, user }) => {
    const { cartItems } = useCartItems();
    const { showAlert } = useAlert();

    const handleClick = () => {
        HandleCart(food, user, cartItems, showAlert);
    };

    return (
        <Button
            variant="contained"
            size="small"
            color="primary"
            aria-label={`Explore ${food.label}`}
            className="cart-button"
            onClick={handleClick}
        >
            <ShoppingCartIcon
                style={{
                    height: "25px",
                    width: "25px",
                }}
            />{" "}
            &nbsp; Cart
        </Button>
    );
};

export default CartButton;
