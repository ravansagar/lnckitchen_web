import { database } from "./firebaseConfig";
import { set, ref, push, get, update } from "firebase/database";

const HandleCart = async (food, user, cartItems, showAlert) => {
    if (!user) {
        showAlert("You need to log in to add items to the cart.", "error");
        return;
    }
    const cartRef = ref(database, `carts/${user.uid}`);
    
    try {
        const cartSnapshot = await get(cartRef);
        const cartData = cartSnapshot.val();

        let itemExists = false;
        let itemKey = null;

        if (cartData) {
            for (let key in cartData) {
                if (cartData[key].label === food.label) {
                    itemExists = true;
                    itemKey = key;
                    break;
                }
            }
        }

        if (itemExists) {
            const itemRef = ref(database, `carts/${user.uid}/${itemKey}`);
            const updatedQuantity = cartData[itemKey].quantity + 1;
            await update(itemRef, { quantity: updatedQuantity });
            showAlert(`${food.label} added to cart.`, "success");
        } else {
            const newCartItemRef = push(cartRef);
            await set(newCartItemRef, {
                ...food,
                quantity: 1
            });
            showAlert(`${food.label} added to cart.`, "success");
        }
    } catch (error) {
        showAlert(`Error adding to cart: ${error.message}`, "error");
    }
};

export default HandleCart;
