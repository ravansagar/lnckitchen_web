import React, { useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import ReviewPopup from "./ReviewPopup";

const OrderPopup = ({ open, onClose, food }) => {
    const [value, setValue] = useState(1);
    const [openReview, setOpenReview] = useState(false);

    const handleIncrement = () => {
        setValue((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    };

    const handleReviewOpen = () => {
        setOpenReview(true);
    };

    const handleReviewClose = () => {
        setOpenReview(false);
    };

    if (!food) return null;

    const price = parseInt(food.price.slice(4));
    const deliveryCharge = 50;
    const totalPrice = (price * value) + deliveryCharge;

    return (
        <>
            {!openReview && (
                <Modal
                    open={open}
                    onClose={onClose}
                    closeAfterTransition
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: 'blur(10px)',
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
                        }}
                    >
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                borderRadius: "50%",
                                border: "1px solid #000",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    bgcolor: "#000",
                                    color: "#fff",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <div>
                            <img
                                src={food.image}
                                alt={food.label}
                                style={{
                                    width: "100%",
                                    height: "350px",
                                    borderRadius: "8px",
                                }}
                            />
                            <Typography
                                variant="subtitle2"
                                mt={2}
                                textAlign="left"
                                ml={2}
                                mr={2}
                            >
                                {food.description}
                            </Typography>
                            <Box textAlign="left" mt={2} ml={2} mr={2}>
                                <Typography variant="body2" mt={2} fontWeight="bold">
                                    Unit Price: Rs. {price}
                                </Typography>
                                <Typography variant="body2" mt={1} fontWeight="bold">
                                    Delivery Charge: Rs. {deliveryCharge}
                                </Typography>
                                <Typography variant="body2" mt={1} fontWeight="bold">
                                    Total Price: Rs. {totalPrice}
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="column"
                                mt={4}
                            >
                                <TextField
                                    value={value}
                                    readOnly
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton onClick={handleDecrement}>
                                                    <RemoveIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleIncrement}>
                                                    <AddIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { textAlign: "center" },
                                    }}
                                    sx={{
                                        width: "150px",
                                        height: "50px",
                                        "& .MuiInputBase-input": {
                                            textAlign: "center",
                                        },
                                    }}
                                />
                            </Box>
                            <Button
                                onClick={handleReviewOpen}
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                Proceed to Review
                            </Button>
                        </div>
                    </Box>
                </Modal>
            )}
            <ReviewPopup
                open={openReview}
                onClose={handleReviewClose}
                food={food}
                totalPrice={totalPrice}
                deliveryCharge={deliveryCharge}
            />
        </>
    );
};

export default OrderPopup;