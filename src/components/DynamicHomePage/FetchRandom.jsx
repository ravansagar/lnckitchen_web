import { useState, useEffect } from 'eact';
import { get, ref } from 'firebase/database';
import { database } from 'components/LoginSignUp/firebaseConfig';

const useFetchRandomFoods = (user) => {
    const [randomFoods, setRandomFoods] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [cartFoods, setCartFoods] = useState([]);
    const [orderFoods, setOrderFoods] = useState([]);
  
    useEffect(() => {
        let isMounted = true;

        const fetchRandomFoods = async () => {
            try {
                if (!database) {
                    console.error("Database reference is not available");
                    return;
                }

                const dishesRef = ref(database, 'Dishes');
                const snapshot = await get(dishesRef);

                if (user) {
                    const descCartsRef = ref(database, `carts/${user.uid}`);
                    const snapshot2 = await get(descCartsRef);

                    const descOrdersRef = ref(database, `transactions/${user.uid}`);
                    const snapshot3 = await get(descOrdersRef);

                    if (snapshot.exists()) {
                        const allDishes = snapshot.val();
                        const allFoods = Object.keys(allDishes).reduce((acc, category) => [
                           ...acc,
                           ...allDishes[category].items,
                        ], []);

                        let cartDescriptions = [];
                        let orderDescriptions = [];

                        if (snapshot2.exists()) {
                            const cartData = snapshot2.val();
                            cartDescriptions = Object.values(cartData).map(item => item.foodDescription);
                            if (isMounted) {
                                setCartFoods(cartDescriptions);
                            }
                        }

                        if (snapshot3.exists()) {
                            const orderData = snapshot3.val();
                            orderDescriptions = Object.values(orderData).map(item => item.foodDescription);
                            if (isMounted) {
                                setOrderFoods(orderDescriptions);
                            }
                        }

                        const allDescriptions = [...new Set([...cartDescriptions,...orderDescriptions])];
                        const keywords = allDescriptions.reduce((acc, desc) => {
                            const words = desc.split(' ');
                            words.forEach(word => {
                                if (!acc.includes(word.toLowerCase())) {
                                    acc.push(word.toLowerCase());
                                }
                            });
                            return acc;
                        }, []);

                        const matchingFoods = allFoods.filter(food =>
                            keywords.some(keyword => food.description.toLowerCase().includes(keyword))
                        );

                        const randomSelectedFoods = [];
                        const randomIndexes = [];
                        while (randomSelectedFoods.length < 8 && matchingFoods.length > randomSelectedFoods.length) {
                            const randomIndex = Math.floor(Math.random() * matchingFoods.length);
                            if (!randomIndexes.includes(randomIndex)) {
                                randomIndexes.push(randomIndex);
                                randomSelectedFoods.push(matchingFoods[randomIndex]);
                            }
                        }
                        if (randomSelectedFoods.length < 8) {
                            const remainingFoods = allFoods.filter(food =>!randomSelectedFoods.includes(food));
                            while (randomSelectedFoods.length < 8) {
                                const randomIndex = Math.floor(Math.random() * remainingFoods.length);
                                if (!randomSelectedFoods.includes(remainingFoods[randomIndex])) {
                                    randomSelectedFoods.push(remainingFoods[randomIndex]);
                                }
                            }
                        }
                      
                        if (isMounted) {
                            setRandomFoods(randomSelectedFoods);
                            setDataLoaded(true);
                        }
                    } else {
                        console.log('No data available');
                    }
                } else {
                    if (snapshot.exists()) {
                        const allDishes = snapshot.val();
                        const allFoods = Object.keys(allDishes).reduce((acc, category) => [
                           ...acc,
                           ...allDishes[category].items,
                        ], []);

                        const randomSelectedFoods = [];
                        while (randomSelectedFoods.length < 8) {
                            const randomIndex = Math.floor(Math.random() * allFoods.length);
                            if (!randomSelectedFoods.includes(allFoods[randomIndex])) {
                                randomSelectedFoods.push(allFoods[randomIndex]);
                            }
                        }

                        if (isMounted) {
                            setRandomFoods(randomSelectedFoods);
                            setDataLoaded(true);
                        }
                    } else {
                        console.log('No data available');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRandomFoods();

        return () => {
            isMounted = false;
        };
    }, [user]);

    return { randomFoods, dataLoaded, cartFoods, orderFoods };
};

export default useFetchRandomFoods;