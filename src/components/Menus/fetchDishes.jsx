// import { useState, useEffect } from "react";
// import { database } from "components/LoginSignUp/firebaseConfig";
// import { get, ref } from "firebase/database";

// const FetchDishes = () => {
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(true);
//     useEffect(() => {
//             if (!database) {
//                 console.error("Database reference is not available");
//                 return;
//             }
//             const dishesRef = ref(database, "Dishes");
//             if (!dishesRef) {
//                 console.error("Dishes reference is not available");
//                 return;
//             }
//             get(dishesRef)
//                 .then((snapshot) => {
//                     if (snapshot.exists()) {
//                         const allDishes = snapshot.val();
//                         setCategories(allDishes);
//                     } else {
//                         console.log("No data available");
//                     }
//                     setLoading(false);
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                     setLoading(false);
//                 });
//         }, []);
//         console.log("I am called..");
//     return { categories, loading };
// }

// export default FetchDishes;

import { useState, useEffect } from "react";
import { database } from "components/LoginSignUp/firebaseConfig";
import { get, ref } from "firebase/database";

const FetchDishes = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                if (!database) {
                    console.error("Database reference is not available");
                    return;
                }
                const dishesRef = ref(database, "Dishes");
                if (!dishesRef) {
                    console.error("Dishes reference is not available");
                    return;
                }
                const snapshot = await get(dishesRef);
                if (snapshot.exists()) {
                    const allDishes = snapshot.val();
                    setCategories(allDishes);
                } else {
                    console.log("No data available");
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);
    return { categories, loading };
};

export default FetchDishes;
