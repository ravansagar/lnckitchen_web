import { useState, useEffect } from "react";
import { database } from "components/LoginSignUp/firebaseConfig";
import { get, ref } from "firebase/database";

const usePastOrders = (user) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const pastOrdersRef = ref(database, `transactions/${user.uid}`);
        get(pastOrdersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const allPastOrders = snapshot.val();
                    const pastOrdersArray = Object.keys(allPastOrders).map(
                        (key) => ({
                            id: key,
                            ...allPastOrders[key]
                        })
                    );
                    setOrders(pastOrdersArray);
                } else {
                    setOrders([]);
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user]);

    return { orders, loading };
};

export default usePastOrders;