// Importing Dependencies
import React, { useContext, useState } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext } from "components/Contexts/ThemeContext";
import { Card, CardContent, Typography, Button } from "@mui/material";
import DocumentTitle from "components/Contexts/DocumentTitle";
import foodItems from "JsonFiles/foodItems.json";
import "./HomeStyle.css";
import OrderPopup from "components/HandleOrder/OrderPopUpContext";
import { styled } from '@mui/system';
// import { OrderButton } from "components/HandleOrder/OrderPopUpContext";
const Overlay = styled('div')({
    position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity as needed
  zIndex: 999,  // Ensure overlay is on top
  });
const HomePage = () => {
    DocumentTitle("Home::lncKitchen");

    const [ PopUp , setPopUp] = useState(false);
    const [selectFood, setselectFood] = useState(null);

    const handleOpenPopUp = (food) => {
        console.log(food);
        setselectFood(food);
        setPopUp(true);
    }
    const handleClosePopUp = () => setPopUp(false);
    const { theme } = useContext(ThemeContext);
    const muiTheme = createTheme({
        palette: {
        mode: theme,
        },
    });

    const FoodItems = foodItems.slice(0, 8);

    return (
        <div>
{PopUp && <Overlay />}
            <ThemeProvider theme={muiTheme}>
                <Typography
                    variant="h4"
                    style={{ textAlign: "center" }}
                    className="topPicks"
                >
                    Top Picks
                </Typography>
                <div className="food-container">
                    {FoodItems.map((food, index) => (
                        <Card key={index} className="food-card">
                            <div>
                                <div className="aspect-ratio">
                                    <img
                                        src={food.image}
                                        alt={food.label}
                                        className="food-image"
                                    />
                                </div>
                                <div className="food-desc">
                                    <Typography
                                        variant="h5"
                                        className="food-label"
                                    >
                                        {food.label}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        {food.description}
                                    </Typography>
                                </div>
                            </div>
                            <CardContent>
                                <div>
                                    <Typography
                                        variant="body2"
                                        className="price"
                                    >
                                        Price: {food.price}
                                    </Typography>
                                    <br />
                                </div>
                                <div className="card-buttons">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        aria-label={`Explore ${food.label}`}
                                        className="order-button"
                                        onClick={() => handleOpenPopUp(food)}
                                    >
                                        <ShoppingCartCheckout /> &nbsp; Order
                                        Now
                                    </Button>
                                    
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        aria-label={`Explore ${food.label}`}
                                        className="cart-button"
                                    >
                                        <ShoppingCartIcon
                                            style={{
                                                height: "25px",
                                                width: "25px",
                                            }}
                                        />{" "}
                                        &nbsp; Cart
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ThemeProvider>
            <OrderPopup open={PopUp} onClose={handleClosePopUp} food={selectFood} />
        </div>
    );
};

export default HomePage;
