import React, { useState, useEffect, useRef, useContext } from "react";
import "components/firebaseDataFetch/fetchCss.css";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Container
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DocumentTitle from "components/Contexts/DocumentTitle";
import { ThemeContext } from "components/Contexts/ThemeContext";
import { getDatabase, ref, child, get } from 'firebase/database';

const Menu = () => {
    const { theme } = useContext(ThemeContext);
    const muiTheme = createTheme({
        palette: {
            mode: theme,
        },
    });

    const [expandedCategory, setExpandedCategory] = useState(null);
    const [dishes, setDishes] = useState({});
    const categoryRefs = useRef({});

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'Dishes'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setDishes(snapshot.val());
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (expandedCategory && categoryRefs.current[expandedCategory]) {
            categoryRefs.current[expandedCategory].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [expandedCategory]);

    const handleCategoryClick = (category) => {
        setExpandedCategory(
            category === expandedCategory ? null : category
        );
    };

    DocumentTitle("Menu::lncKitchen");

    return (
        <>
            <ThemeProvider theme={muiTheme}>
                <Container>
                    <div className="menuContainer">
                        <h2>Our Menu</h2>
                        <div className="menuItemsContainer">
                            {Object.keys(dishes).map((category) => (
                                <div
                                    key={category}
                                    ref={(el) =>
                                        (categoryRefs.current[
                                            category
                                        ] = el)
                                    }
                                    className={`category ${
                                        expandedCategory === category
                                            ? "expanded"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                >
                                    <div className="imageContainer">
                                        <img
                                            src={dishes[category].image}
                                            alt={`${category} image`}
                                        />
                                        <div className="imageOverlay"></div>
                                        <h3 className="categoryLabel">
                                            {category}
                                        </h3>
                                    </div>
                                    {expandedCategory === category && (
                                        <Grid
                                            container
                                            spacing={2}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            {dishes[category].items.map(
                                                (item, index) => (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sm={6}
                                                        md={4}
                                                        lg={3}
                                                        key={index}
                                                    >
                                                        <Card className="menuItem food-card">
                                                            <CardMedia
                                                                component="img"
                                                                alt={item.label}
                                                                height="140"
                                                                image={item.image}
                                                                title={item.label}
                                                            />
                                                            <CardContent>
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="h6"
                                                                    component="div"
                                                                >
                                                                    {
                                                                        item.label
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="body1"
                                                                    color="text.primary"
                                                                >
                                                                    {
                                                                        item.price
                                                                    }
                                                                </Typography>
                                                                <div
                                                                    className="btn"
                                                                    style={{
                                                                        display:
                                                                            "flex",
                                                                        justifyContent:
                                                                            "space-between",
                                                                        marginTop:
                                                                            "10px",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        variant="outlined"
                                                                        startIcon={
                                                                            <AddShoppingCartIcon />
                                                                        }
                                                                    >
                                                                        Cart
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        endIcon={
                                                                            <ShoppingCartCheckoutIcon />
                                                                        }
                                                                    >
                                                                        Buy
                                                                    </Button>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default Menu;
