// import React, { useContext, useState, useEffect } from "react";
// import { Modal, Box, Typography, List, ListItem, ListItemText, Divider, Stack, Input, IconButton, Button } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import { AuthContext } from "components/Contexts/AuthContext";
// import PayViaEsewa from "./eSewa";
// import { database } from "components/Contexts/firebaseConfig";
// import { ref, set } from "firebase/database";
// import { useNavigate } from "react-router-dom";

// const ReviewPopup = ({ open, onClose, food, totalPrice, deliveryCharge }) => {
//     const { user } = useContext(AuthContext);
//     const [address, setAddress] = useState('');
//     const [isEditing, setIsEditing] = useState(!user?.address);
//     const { navigate } = useNavigate();
//     useEffect(() => {
//         if (user && user.address) {
//             setAddress(user.address);
//         }
//     }, [user]);

//     const toggleEditing = () => {
//         if (isEditing) {
//             saveAddressToFirebase(address);
//         }
//         setIsEditing(!isEditing);
//     };

//     const saveAddressToFirebase = (newAddress) => {
//         set(ref(database, `users/${user.uid}/address`), newAddress);
//     };

//     const handleInputChange = (event) => {
//         setAddress(event.target.value);
//     };

//     return (
//         <Modal
//             open={open}
//             onClose={onClose}
//             closeAfterTransition
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 bgcolor: "rgba(0, 0, 0, 0.7)",
//             }}
//         >
//             <Box
//                 sx={{
//                     position: "relative",
//                     bgcolor: "background.paper",
//                     boxShadow: 24,
//                     p: 2,
//                     borderRadius: 1,
//                     textAlign: "center",
//                     width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
//                     maxWidth: "500px",
//                     height: 'auto',
//                 }}
//             >
//                 {user ? (<>
//                 <Stack spacing={2}>
//                     <Typography variant="h4">{food.label}</Typography>
//                     <List disablePadding>
//                         <ListItem sx={{ py: 1, px: 0 }}>
//                             <ListItemText primary="Price" />
//                             <Typography variant="body2">
//                                 Rs. {totalPrice - deliveryCharge}
//                             </Typography>
//                         </ListItem>
//                         <ListItem sx={{ py: 1, px: 0 }}>
//                             <ListItemText primary="Delivery Charges" />
//                             <Typography variant="body2">
//                                 Rs. {deliveryCharge}
//                             </Typography>
//                         </ListItem>
//                         <ListItem sx={{ py: 1, px: 0 }}>
//                             <ListItemText primary="Total Price" />
//                             <Typography
//                                 variant="subtitle1"
//                                 sx={{ fontWeight: 700 }}
//                             >
//                                 Rs. {totalPrice}
//                             </Typography>
//                         </ListItem>
//                     </List>
//                     <Typography sx={{ display: 'flex', alignItems: 'center' }}>
//                         Address:{" "}
//                         {isEditing ? (
//                             <Input
//                                 placeholder="Enter address"
//                                 value={address}
//                                 onChange={handleInputChange}
//                                 sx={{ width: "100%", ml: 1 }}
//                             />
//                         ) : (
//                             <span style={{ marginLeft: '8px' }}>{address}</span>
//                         )}
//                         <IconButton onClick={toggleEditing} sx={{ ml: 1 }}>
//                             {isEditing ? <SaveIcon /> : <EditIcon />}
//                         </IconButton>
//                     </Typography>
//                     <Divider />
//                     <Typography sx={{ spacing: 1 }}>Pay Via</Typography>
//                     <PayViaEsewa label={food.label} description={food.description} totalPrice={totalPrice} deliveryCharge={deliveryCharge} user={user} />
//                     {/* <PayViaKhalti totalPrice={totalPrice} deliveryCharge={deliveryCharge} user={user} /> */}
//                 </Stack>
//                 </>) : (<>
//                     <Button onClick={()=>{
//                         navigate('/login');
//                     }}>
//                     <Typography sx={{ spacing: 1 }}>Plase SignIn/SignUp First</Typography>
//                     </Button>
//                 </>)}
//             </Box>
//         </Modal>
        
//     );
// };

// export default ReviewPopup;


import React, { useContext, useState, useEffect } from "react";
import { Modal, Box, Typography, List, ListItem, ListItemText, Divider, Stack, Input, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { AuthContext } from "components/Contexts/AuthContext";
import PayViaEsewa from "./eSewa";
import PayViaKhalti from "./payViaKhalti";
import { database } from "components/Contexts/firebaseConfig";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const ReviewPopup = ({ open, onClose, food, totalPrice, deliveryCharge }) => {
    const { user } = useContext(AuthContext);
    const [address, setAddress] = useState('');
    const [isEditing, setIsEditing] = useState(!user?.address);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.address) {
            setAddress(user.address);
        }
    }, [user]);

    const toggleEditing = () => {
        if (isEditing) {
            saveAddressToFirebase(address);
        }
        setIsEditing(!isEditing);
    };

    const saveAddressToFirebase = (newAddress) => {
        set(ref(database, `users/${user.uid}/address`), newAddress);
    };

    const handleInputChange = (event) => {
        setAddress(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && isEditing) {
            toggleEditing();
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0, 0, 0, 0.7)",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 1,
                    textAlign: "center",
                    width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
                    maxWidth: "500px",
                    height: 'auto',
                }}
            >
                {user ? (
                    <Stack spacing={2}>
                        <Typography variant="h4">{food.label}</Typography>
                        <List disablePadding>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Price" />
                                <Typography variant="body2">
                                    Rs. {totalPrice - deliveryCharge}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Delivery Charges" />
                                <Typography variant="body2">
                                    Rs. {deliveryCharge}
                                </Typography>
                            </ListItem>
                            <ListItem sx={{ py: 1, px: 0 }}>
                                <ListItemText primary="Total Price" />
                                <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 700 }}
                                >
                                    Rs. {totalPrice}
                                </Typography>
                            </ListItem>
                        </List>
                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                            Address:{" "}
                            {isEditing ? (
                                <Input
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={handleInputChange}
                                    onKeyPress={handleKeyPress}
                                    sx={{ width: "100%", ml: 1 }}
                                />
                            ) : (
                                <span style={{ marginLeft: '8px' }}>{address}</span>
                            )}
                            <IconButton onClick={toggleEditing} sx={{ ml: 1 }}>
                                {isEditing ? <SaveIcon /> : <EditIcon />}
                            </IconButton>
                        </Typography>
                        <Divider />
                        <Typography sx={{ spacing: 1 }}>Pay Via</Typography>
                        <PayViaEsewa label={food.label} description={food.description} totalPrice={totalPrice} deliveryCharge={deliveryCharge} user={user} />
                        <PayViaKhalti label={food.label} description={food.description} totalPrice={totalPrice} deliveryCharge={deliveryCharge} user={user} />
                    </Stack>
                ) : (
                    <Button onClick={() => navigate('/login')}>
                        <Typography sx={{ spacing: 1 }}>Please SignIn/SignUp First</Typography>
                    </Button>
                )}
            </Box>
        </Modal>
    );
};

export default ReviewPopup;
