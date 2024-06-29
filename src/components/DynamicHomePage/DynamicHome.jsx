import { useContext, useState } from "react";
import { ShoppingCartCheckout } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeContext } from "components/Contexts/ThemeContext";
import { Card, CardContent, Typography, Button, Skeleton } from "@mui/material";
import DocumentTitle from "components/Contexts/DocumentTitle";
import "./DynamicStyle.css";
import OrderPopup from "components/HandleOrder/OrderPopUpContext";
import { styled } from '@mui/system';
import { AuthContext } from "components/Contexts/AuthContext";
import CartButton from "components/Contexts/HandleCart";
import useFetchRandomFoods from "./FetchRandom";

const Overlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    zIndex: 999, 
});

export const DynamicHomePage = () => {
    DocumentTitle("Home::lncKitchen");
    const [PopUp, setPopUp] = useState(false);
    const [selectFood, setselectFood] = useState(null);
    const { theme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const muiTheme = createTheme({
        palette: {
            mode: theme,
        },
    });
    const { randomFoods, dataLoaded } = useFetchRandomFoods(user);
    const handleOpenPopUp = (food) => {
        setselectFood(food);
        setPopUp(true);
    }

    const handleClosePopUp = () => setPopUp(false);

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
                    {!dataLoaded && Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="food-card">
                            <Skeleton variant="rectangular" height="70svh" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Card>
                    ))}

                    {dataLoaded && randomFoods.map((food, index) => (
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
                                        variant="h6"
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
                                    <CartButton food={food} user={user}/>
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

export default DynamicHomePage;
