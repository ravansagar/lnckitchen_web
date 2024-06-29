import { useState, useEffect } from "react";
import { database } from "components/LoginSignUp/firebaseConfig";
import { get, ref, remove } from "firebase/database";

const useCartItems = (user) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = () => {
        if (!user) {
            setLoading(false);
            return;
        }
        const cartRef = ref(database, `carts/${user.uid}`);
        get(cartRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const allCartItems = snapshot.val();
                    const cartItemsArray = Object.keys(allCartItems).map((key) => {
                        const { label, price, quantity } = allCartItems[key];
                        return {
                            id: key,
                            label: label,
                            price: parseInt(price.slice(4)),
                            quantity: quantity,
                        };
                    });
                    setCartItems(cartItemsArray);
                } else {
                    setCartItems([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching cart items:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleQuantityChange = (itemId, type) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === itemId) {
                let updatedQuantity = item.quantity;
                if (type === "increase") {
                    updatedQuantity += 1;
                } else if (type === "decrease" && item.quantity > 1) {
                    updatedQuantity -= 1;
                }
                const updatedPrice = updatedQuantity * (item.price / item.quantity);
                return { ...item, quantity: updatedQuantity, price: updatedPrice };
            }
            return item;
        });

        setCartItems(updatedCartItems);
    };

    const handleDeleteItem = async (itemId) => {
        if (!user) return Promise.reject(new Error("User not authenticated"));

        const cartItemRef = ref(database, `carts/${user.uid}/${itemId}`);
        return remove(cartItemRef)
            .then(() => {
                console.log(`Item ${itemId} deleted successfully`);
                fetchCartItems(); 
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
                throw error;
            });
    };

    useEffect(() => {
        fetchCartItems();
    }, [user]);

    return { cartItems, loading, handleQuantityChange, handleDeleteItem };
};

export default useCartItems;
