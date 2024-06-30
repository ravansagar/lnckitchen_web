// import React, { useState, useRef, useEffect, useContext } from "react";
// import "./MenuPage.css";
// import {
//     Card,
//     CardContent,
//     CardMedia,
//     Typography,
//     Button,
//     Grid,
//     Container,
//     Skeleton,
// } from "@mui/material";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import DocumentTitle from "components/Contexts/DocumentTitle";
// import { ThemeContext } from "components/Contexts/ThemeContext";
// import { database } from "components/Contexts/firebaseConfig";
// import { set, ref, push } from "firebase/database";
// import OrderPopup from "components/HandleOrder/OrderPopUpContext";
// import { useAlert } from "components/Contexts/AlertContext";
// import FetchDishes from "./fetchDishes";
// import CartButton from "components/Contexts/HandleCart";


// const Menu = ({user}) => {
//     const [PopUp, setPopUp] = useState(false);
//     const [selectFood, setselectFood] = useState(null);
//     const  { categories, loading } = FetchDishes();
//     const { theme } = useContext(ThemeContext);
//     const { showAlert } = useAlert();
//     const muiTheme = createTheme({
//         palette: {
//             mode: theme,
//         },
//     });
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const categoryRefs = useRef({});

    

//     useEffect(() => {
//         if (expandedCategory && categoryRefs.current[expandedCategory]) {
//             categoryRefs.current[expandedCategory].scrollIntoView({
//                 behavior: "smooth",
//                 block: "start",
                
//             });
//         }
//     }, [expandedCategory]);

//     const handleCategoryClick = (category) => {
//         setExpandedCategory(category === expandedCategory ? null : category);
//     };

//     DocumentTitle("Menu::lncKitchen");

//     const handleOpenPopUp = (food) => {
//         setselectFood(food);
//         setPopUp(true);
//     };
//     const handleClosePopUp = () => setPopUp(false);

//     const handleCart = (food) => {
//         if (!user) {
//             showAlert("You need to log in to add items to the cart.", "error");
//             return;
//         }

//         const cartRef = ref(database, `carts/${user.uid}`);
//         const newCartItemRef = push(cartRef);

//         set(newCartItemRef, {
//             ...food,
//             quantity: 1
//         }).then(() => {
//             showAlert(`${food.label} added to cart.`, "success");
//         }).catch((error) => {
//             showAlert(`Error adding to cart: ${error.message}`, "error");
//         });
//     };

//     return (
//         <>
//             <ThemeProvider theme={muiTheme}>
//                 <Container>
//                     <div className="menuContainer">
//                         <h2>Our Menu</h2>
//                         <div className="menuItemsContainer">
//                             {loading ? (
//                                 <Grid
//                                     container
//                                     spacing={2}
//                                     justifyContent="center"
//                                     alignItems="center"
//                                 >
//                                     {Array.from(new Array(8)).map(
//                                         (_, index) => (
//                                             <Grid
//                                                 item
//                                                 xs={12}
//                                                 sm={6}
//                                                 md={4}
//                                                 lg={3}
//                                                 key={index}
//                                             >
//                                                 <Card className="menuItem food-card">
//                                                     <Skeleton
//                                                         variant="rectangular"
//                                                         height={140}
//                                                     />
//                                                     <CardContent>
//                                                         <Skeleton width="60%" />
//                                                         <Skeleton width="40%" />
//                                                         <Skeleton width="80%" />
//                                                     </CardContent>
//                                                 </Card>
//                                             </Grid>
//                                         )
//                                     )}
//                                 </Grid>
//                             ) : (
//                                 Object.keys(categories).map((category) => (
//                                     <div
//                                         key={category}
//                                         ref={(el) =>
//                                             (categoryRefs.current[category] =
//                                                 el)
//                                         }
//                                         className={`category ${
//                                             expandedCategory === category
//                                                 ? "expanded"
//                                                 : ""
//                                         }`}
//                                         onClick={() =>
//                                             handleCategoryClick(category)
//                                         }
//                                     >
//                                         <div className="imageContainer">
//                                             <img
//                                                 src={categories[category].image}
//                                                 alt={`Dish category: ${category}`}
//                                             />
//                                             <div className="imageOverlay"></div>
//                                             <h3 className="categoryLabel">
//                                                 {category}
//                                             </h3>
//                                         </div>
//                                         {expandedCategory === category && (
//                                             <Grid
//                                                 container
//                                                 spacing={2}
//                                                 justifyContent="center"
//                                                 alignItems="center"
//                                             >
//                                                 {categories[category].items.map(
//                                                     (item, index) => (
//                                                         <Grid
//                                                             item
//                                                             xs={12}
//                                                             sm={6}
//                                                             md={4}
//                                                             lg={3}
//                                                             key={index}
//                                                         >
//                                                             <Card className="menuItem food-card">
//                                                                 <div className="imageWrapper">
//                                                                     <CardMedia
//                                                                         component="img"
//                                                                         alt={
//                                                                             item.label
//                                                                         }
//                                                                         height="200"
//                                                                         image={
//                                                                             item.image
//                                                                         }
//                                                                         title={
//                                                                             item.label
//                                                                         }
//                                                                         sx={{
//                                                                             borderRadius:
//                                                                                 "5%",
//                                                                             objectFit:
//                                                                                 "cover",
//                                                                         }}
//                                                                     />
//                                                                     <div className="overlay">
//                                                                         <Typography
//                                                                             variant="body2"
//                                                                             color="text.secondary"
//                                                                         >
//                                                                             {
//                                                                                 item.description
//                                                                             }
//                                                                         </Typography>
//                                                                     </div>
//                                                                 </div>
//                                                                 <CardContent>
//                                                                     <Typography
//                                                                         className="responsiveLabel"
//                                                                         gutterBottom
//                                                                         component="div"
//                                                                     >
//                                                                         {
//                                                                             item.label
//                                                                         }
//                                                                     </Typography>
//                                                                     <Typography
//                                                                         variant="body1"
//                                                                         color="text.primary"
//                                                                     >
//                                                                         {
//                                                                             item.price
//                                                                         }
//                                                                     </Typography>
//                                                                     <div
//                                                                         className="btn"
//                                                                         style={{
//                                                                             display:
//                                                                                 "flex",
//                                                                             justifyContent:
//                                                                                 "space-between",
//                                                                             marginTop:
//                                                                                 "10px",
//                                                                         }}
//                                                                     >
//                                                                         <CartButton food={item} user={user}/>
//                                                                         <Button
//                                                                             variant="contained"
//                                                                             endIcon={
//                                                                                 <ShoppingCartCheckoutIcon />
//                                                                             }
//                                                                             onClick={() =>
//                                                                                 handleOpenPopUp(
//                                                                                     item
//                                                                                 )
//                                                                             }
//                                                                         >
//                                                                             Buy
//                                                                         </Button>
//                                                                     </div>
//                                                                 </CardContent>
//                                                             </Card>
//                                                         </Grid>
//                                                     )
//                                                 )}
//                                             </Grid>
//                                         )}
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </Container>
//             </ThemeProvider>
//             <OrderPopup
//                 open={PopUp}
//                 onClose={handleClosePopUp}
//                 food={selectFood}
//             />
//         </>
//     );
// };

// export default Menu;


import React, { useState, useRef, useEffect, useContext } from "react";
import "./MenuPage.css";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  Skeleton,
} from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DocumentTitle from "components/Contexts/DocumentTitle";
import { ThemeContext } from "components/Contexts/ThemeContext";
import { database } from "components/Contexts/firebaseConfig";
import { set, ref, push } from "firebase/database";
import OrderPopup from "components/HandleOrder/OrderPopUpContext";
import { useAlert } from "components/Contexts/AlertContext";
import FetchDishes from "./fetchDishes";
import CartButton from "components/Contexts/HandleCart";

const Menu = ({ user }) => {
  const [PopUp, setPopUp] = useState(false);
  const [selectFood, setselectFood] = useState(null);
  const { categories, loading } = FetchDishes();
  const { theme } = useContext(ThemeContext);
  const { showAlert } = useAlert();
  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  const [expandedCategory, setExpandedCategory] = useState(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    if (expandedCategory && categoryRefs.current[expandedCategory]) {
      categoryRefs.current[expandedCategory].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [expandedCategory]);

  const handleCategoryClick = (category) => {
    setExpandedCategory(category === expandedCategory ? null : category);
  };

  DocumentTitle("Menu::lncKitchen");

  const handleOpenPopUp = (food) => {
    setselectFood(food);
    setPopUp(true);
  };
  const handleClosePopUp = () => setPopUp(false);

  const handleCart = (food) => {
    if (!user) {
      showAlert("You need to log in to add items to the cart.", "error");
      return;
    }

    const cartRef = ref(database, `carts/${user.uid}`);
    const newCartItemRef = push(cartRef);

    set(newCartItemRef, {
      ...food,
      quantity: 1,
    })
      .then(() => {
        showAlert(`${food.label} added to cart.`, "success");
      })
      .catch((error) => {
        showAlert(`Error adding to cart: ${error.message}`, "error");
      });
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" className="menuContainer">
        <h2>Our Menu</h2>
        <div className="menuItemsContainer">
          {loading ? (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {Array.from(new Array(8)).map((_, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                >
                  <Card className="menuItem food-card">
                    <Skeleton variant="rectangular" height={140} />
                    <CardContent>
                      <Skeleton width="60%" />
                      <Skeleton width="40%" />
                      <Skeleton width="80%" />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            Object.keys(categories).map((category) => (
              <div
                key={category}
                ref={(el) => (categoryRefs.current[category] = el)}
                className={`category ${
                  expandedCategory === category ? "expanded" : ""
                }`}
                onClick={(e) => {
                  handleCategoryClick(category);
                  e.stopPropagation();
                }}
              >
                <div className="imageContainer">
                  <img
                    src={categories[category].image}
                    alt={`Dish category: ${category}`}
                  />
                  <div className="imageOverlay"></div>
                  <h3 className="categoryLabel">{category}</h3>
                </div>
                {expandedCategory === category && (
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {categories[category].items.map((item, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={index}
                      >
                        <Card className="menuItem food-card">
                          <div className="imageWrapper">
                            <CardMedia
                              component="img"
                              alt={item.label}
                              height="200"
                              image={item.image}
                              title={item.label}
                              sx={{
                                borderRadius: "5%",
                                objectFit: "cover",
                              }}
                            />
                            <div className="overlay">
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                            </div>
                          </div>
                          <CardContent>
                            <Typography
                              className="responsiveLabel"
                              gutterBottom
                              component="div"
                            >
                              {item.label}
                            </Typography>
                            <Typography variant="body1" color="text.primary">
                              {item.price}
                            </Typography>
                            <div
                              className="btn"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "10px",
                              }}
                            >
                              <CartButton food={item} user={user} />
                              <Button
                                variant="contained"
                                endIcon={<ShoppingCartCheckoutIcon />}
                                onClick={() => handleOpenPopUp(item)}
                              >
                                Buy
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </div>
            ))
          )}
        </div>
      </Container>
      <OrderPopup
        open={PopUp}
        onClose={handleClosePopUp}
        food={selectFood}
        onClickAway={(e) => e.stopPropagation()} 
      />
    </ThemeProvider>
  );
};

export default Menu;