import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Paper,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Button,
  styled,
  
} from "@mui/material";
import {
    Edit,
    Logout,
    Home,
    ExpandMore,
    PhotoCamera,
    Visibility,
    VisibilityOff,
    LightModeOutlined,
    DarkModeOutlined,
    Delete,
    ShoppingCartCheckout,
    Add,
    Remove,
    CheckCircleOutline
  } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "components/Contexts/ThemeContext";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { database, storage } from "components/Contexts/firebaseConfig";
import { set, ref } from "firebase/database";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { auth } from "components/LoginSignUp/firebaseConfig";
import { signOut } from "firebase/auth";
import OrderPopup from "components/HandleOrder/OrderPopUpContext";
import CartItems from "./cartItems";
import usePastOrders from "./pastOrders";

const UserProfile = ({ user }) => {
  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    address: false,
  });
  const [tabValue, setTabValue] = useState(0);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatar: null,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [tempData, setTempData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [expanded, setExpanded] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [PopUp, setPopUp] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const { cartItems, loading, handleQuantityChange, handleDeleteItem } = CartItems(user);
  const { orders, loading: ordersLoading } = usePastOrders(user);

  const navigate = useNavigate();

  const handleOpenPopUp = (item) => {
    setSelectedFood(item);
    setPopUp(true);
  };

  const handleClosePopUp = () => setPopUp(false);

  useEffect(() => {
    if (user) {
      setUserData({
        fullName: user.displayName || user.fullName || "",
        email: user.email || "",
        phone: user.phone || "Set Phone Number",
        address: user.address || "Set Address",
        avatar: user.photoURL || user.avatar || null,
      });
      setTempData({
        name: user.displayName || user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
    if (field === "name") {
      setTempData({ ...tempData, [field]: userData.fullName });
    } else {
      setTempData({ ...tempData, [field]: userData[field] });
    }
  };

  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
    setUserData({ ...userData, [field]: tempData[field] });
    if (user) {
      set(ref(database, `users/${user.uid}`), {
        fullName: field === "name" ? tempData.name : userData.fullName,
        email: userData.email,
        phone: field === "phone" ? tempData.phone : userData.phone,
        address: field === "address" ? tempData.address : userData.address,
        avatar: userData.avatar,
      });
    }
    console.log("User data saved:", {
      ...userData,
      [field]: tempData[field],
    });
  };

  const handleInputChange = (e, field) => {
    setTempData({ ...tempData, [field]: e.target.value });
  };

  const handleInputKeyPress = (e, field) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave(field);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out!!!");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  const handlePasswordDataChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );

      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, passwordData.newPassword);
        alert("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setExpanded(false);
      } catch (error) {
        alert(`Error updating password: ${error.message}`);
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageReference = storageRef(storage, `avatars/${user.uid}`);
      try {
        await uploadBytes(storageReference, file);
        const url = await getDownloadURL(storageReference);
        setUserData({ ...userData, avatar: url });
        if (user) {
          set(ref(database, `users/${user.uid}`), {
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            avatar: url,
          });
        }
        console.log("Avatar updated successfully:", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [field]: !passwordVisibility[field],
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: "-86px", mb: 4 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Box flexGrow={1} />
          <IconButton
            edge="end"
            color="inherit"
            aria-label="toggle dark mode"
            onClick={toggleTheme}
            sx={{ marginLeft: 2, marginRight: 2 }}
          >
            {theme === "dark" ? (
              <LightModeOutlined style={{ color: "yellow" }} />
            ) : (
              <DarkModeOutlined />
            )}
          </IconButton>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={() => handleSignOut()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <label htmlFor="avatar-input">
            <Avatar
              alt="User Avatar"
              src={userData.avatar}
              sx={{
                width: 120,
                height: 120,
                fontSize: 48,
                cursor: "pointer",
              }}
            >
              {userData.fullName.charAt(0)}
            </Avatar>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
            />
            <PhotoCamera fontSize="large" />
          </label>
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          {editMode.name ? (
            <TextField
              value={tempData.name}
              onChange={(e) => handleInputChange(e, "name")}
              onKeyDown={(e) => handleInputKeyPress(e, "name")}
              sx={{
                width: "auto",
                "& .MuiInputBase-input": {
                  fontSize: 24,
                  fontWeight: 500,
                },
              }}
              variant="outlined"
              onBlur={() => handleSave("name")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleSave("name")}>
                      <CheckCircleOutline />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            <React.Fragment>
              {userData.fullName}
              <Edit
                fontSize="small"
                style={{
                  marginLeft: "0.5rem",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() => handleEdit("name")}
              />
            </React.Fragment>
          )}
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Details" />
          <Tab label="Cart Items" />
          <Tab label="Past Orders" />
        </Tabs>
        {tabValue === 0 && (
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Full Name</Typography>
                <Typography>{userData.fullName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Email</Typography>
                <Typography>{userData.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Phone</Typography>
                {editMode.phone ? (
                  <TextField
                    value={tempData.phone}
                    onChange={(e) => handleInputChange(e, "phone")}
                    onKeyPress={(e) => handleInputKeyPress(e, "phone")}
                    fullWidth
                    variant="outlined"
                    onBlur={() => handleSave("phone")}
                  />
                ) : (
                  <React.Fragment>
                    {userData.phone}
                    <Edit
                      fontSize="small"
                      style={{
                        marginLeft: "0.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit("phone")}
                    />
                  </React.Fragment>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Address</Typography>
                {editMode.address ? (
                  <TextField
                    value={tempData.address}
                    onChange={(e) => handleInputChange(e, "address")}
                    onKeyPress={(e) => handleInputKeyPress(e, "address")}
                    fullWidth
                    variant="outlined"
                    onBlur={() => handleSave("address")}
                  />
                ) : (
                  <React.Fragment>
                    {userData.address}
                    <Edit
                      fontSize="small"
                      style={{
                        marginLeft: "0.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleEdit("address")}
                    />
                  </React.Fragment>
                )}
              </Grid>
              <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                sx={{ mt: 2 }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Change Password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <TextField
                        label="Current Password"
                        name="currentPassword"
                        type={
                          passwordVisibility.currentPassword
                            ? "text"
                            : "password"
                        }
                        value={passwordData.currentPassword}
                        onChange={handlePasswordDataChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  togglePasswordVisibility("currentPassword")
                                }
                                edge="end"
                              >
                                {passwordVisibility.currentPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="New Password"
                        name="newPassword"
                        type={
                          passwordVisibility.newPassword
                            ? "text"
                            : "password"
                        }
                        value={passwordData.newPassword}
                        onChange={handlePasswordDataChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  togglePasswordVisibility("newPassword")
                                }
                                edge="end"
                              >
                                {passwordVisibility.newPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type={
                          passwordVisibility.confirmPassword
                            ? "text"
                            : "password"
                        }
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordDataChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() =>
                                  togglePasswordVisibility("confirmPassword")
                                }
                                edge="end"
                              >
                                {passwordVisibility.confirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      display="flex"
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePasswordChange}
                      >
                        Change Password
                      </Button>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Box>
        )}
        {tabValue === 1 && (
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Cart Items
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{item.label}</TableCell>
                      <TableCell align="center">Rs. {item.price}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleQuantityChange(item.id, "decrease")}
                        >
                          <Remove />
                        </IconButton>
                        {item.quantity}
                        <IconButton
                          color="primary"
                          onClick={() => handleQuantityChange(item.id, "increase")}
                        >
                          <Add />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          sx={{ color: "#f77", marginRight: 1 }}
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <Delete />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ marginLeft: 1 }}
                          onClick={() => handleOpenPopUp(item)}
                        >
                          <ShoppingCartCheckout />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {tabValue === 2 && (
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Past Orders
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Items</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Payment Method</TableCell>
                    <TableCell align="center">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item) => (
                    <TableRow>
                      <TableCell align="center">{item.date}</TableCell>
                      <TableCell align="center">{item.label}</TableCell>
                      <TableCell align="center">{item.status}</TableCell>
                      <TableCell align="center">{item.method}</TableCell>
                      <TableCell align="center">Rs. {item.amount + item.deliveryCharge}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
      {PopUp && (
        <Overlay>
          <OrderPopup open={PopUp} onClose={handleClosePopUp} food={selectedFood} />
        </Overlay>
      )}
    </Container>
  );
};

export default UserProfile;

const Overlay = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  zIndex: 999,
});
// import React, { useState, useEffect, useContext } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Avatar,
//   Tabs,
//   Tab,
//   Paper,
//   AppBar,
//   Toolbar,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Table,
//   TableBody,
//   TableContainer,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
// } from "@mui/material";
// import {
//   Edit,
//   Logout,
//   Home,
//   ExpandMore,
//   PhotoCamera,
//   Visibility,
//   VisibilityOff,
//   LightModeOutlined,
//   DarkModeOutlined,
//   Delete,
//   ShoppingCartCheckout,
//   Add,
//   Remove,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { ThemeContext } from "components/Contexts/ThemeContext";
// import {
//   getAuth,
//   reauthenticateWithCredential,
//   EmailAuthProvider,
//   updatePassword,
// } from "firebase/auth";
// import { database, storage } from "components/Contexts/firebaseConfig";
// import { set, ref } from "firebase/database";
// import {
//   getDownloadURL,
//   ref as storageRef,
//   uploadBytes,
// } from "firebase/storage";
// import { auth } from "components/LoginSignUp/firebaseConfig";
// import { signOut } from "firebase/auth";
// import OrderPopup from "components/HandleOrder/OrderPopUpContext";
// import { styled } from "@mui/system";
// import CartItems from "./cartItems";
// import usePastOrders from "./pastOrders";

// const UserProfile = ({ user }) => {
//   const [editMode, setEditMode] = useState({
//     name: false,
//     phone: false,
//     address: false,
//   });
//   const [tabValue, setTabValue] = useState(0);
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     address: "",
//     avatar: null,
//   });
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [passwordVisibility, setPasswordVisibility] = useState({
//     currentPassword: false,
//     newPassword: false,
//     confirmPassword: false,
//   });
//   const [tempData, setTempData] = useState({
//     name: "",
//     phone: "",
//     address: "",
//   });
//   const [expanded, setExpanded] = useState(false);
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const [PopUp, setPopUp] = useState(false);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const { cartItems, loading, handleQuantityChange, handleDeleteItem } = CartItems(user);
//   const { orders, loading: ordersLoading } = usePastOrders(user);

//   const navigate = useNavigate();

//   const handleOpenPopUp = (item) => {
//     setSelectedFood(item);
//     setPopUp(true);
//   };

//   const handleClosePopUp = () => setPopUp(false);

//   useEffect(() => {
//     if (user) {
//       setUserData({
//         fullName: user.displayName || user.fullName || "",
//         email: user.email || "",
//         phone: user.phone || "Set Phone Number",
//         address: user.address || "Set Address",
//         avatar: user.photoURL || user.avatar || null,
//       });
//       setTempData({
//         name: user.displayName || user.fullName || "",
//         phone: user.phone || "",
//         address: user.address || "",
//       });
//     }
//   }, [user]);

//   const handleEdit = (field) => {
//     setEditMode({ ...editMode, [field]: true });
//     if (field === "name") {
//       setTempData({ ...tempData, [field]: userData.fullName });
//     } else {
//       setTempData({ ...tempData, [field]: userData[field] });
//     }
//   };

//   const handleSave = (field) => {
//     setEditMode({ ...editMode, [field]: false });
//     setUserData({ ...userData, [field]: tempData[field] });
//     if (user) {
//       set(ref(database, `users/${user.uid}`), {
//         fullName: field === "name" ? tempData.name : userData.fullName,
//         email: userData.email,
//         phone: field === "phone" ? tempData.phone : userData.phone,
//         address: field === "address" ? tempData.address : userData.address,
//         avatar: userData.avatar,
//       });
//     }
//     console.log("User data saved:", {
//       ...userData,
//       [field]: tempData[field],
//     });
//   };

//   const handleInputChange = (e, field) => {
//     setTempData({ ...tempData, [field]: e.target.value });
//   };

//   const handleInputKeyPress = (e, field) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSave(field);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("User signed out!!!");
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.log("Error: " + error);
//       });
//   };

//   const handlePasswordDataChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData({ ...passwordData, [name]: value });
//   };

//   const handlePasswordChange = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords do not match");
//       return;
//     }

//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (user) {
//       const credential = EmailAuthProvider.credential(
//         user.email,
//         passwordData.currentPassword
//       );

//       try {
//         await reauthenticateWithCredential(user, credential);
//         await updatePassword(user, passwordData.newPassword);
//         alert("Password updated successfully");
//         setPasswordData({
//           currentPassword: "",
//           newPassword: "",
//           confirmPassword: "",
//         });
//         setExpanded(false);
//       } catch (error) {
//         alert(`Error updating password: ${error.message}`);
//       }
//     }
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const storageReference = storageRef(storage, `avatars/${user.uid}`);
//       try {
//         await uploadBytes(storageReference, file);
//         const url = await getDownloadURL(storageReference);
//         setUserData({ ...userData, avatar: url });
//         if (user) {
//           set(ref(database, `users/${user.uid}`), {
//             fullName: userData.fullName,
//             email: userData.email,
//             phone: userData.phone,
//             address: userData.address,
//             avatar: url,
//           });
//         }
//         console.log("Avatar updated successfully:", url);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     setPasswordVisibility({
//       ...passwordVisibility,
//       [field]: !passwordVisibility[field],
//     });
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: "-86px", mb: 4 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Button
//             color="inherit"
//             startIcon={<Home />}
//             onClick={() => navigate("/")}
//           >
//             Home
//           </Button>
//           <Box flexGrow={1} />
//           <IconButton
//             edge="end"
//             color="inherit"
//             aria-label="toggle dark mode"
//             onClick={toggleTheme}
//             sx={{ marginLeft: 2, marginRight: 2 }}
//           >
//             {theme === "dark" ? (
//               <LightModeOutlined style={{ color: "yellow" }} />
//             ) : (
//               <DarkModeOutlined />
//             )}
//           </IconButton>
//           <Button
//             color="inherit"
//             startIcon={<Logout />}
//             onClick={() => handleSignOut()}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
//         <Box display="flex" justifyContent="center" mb={3}>
//           <label htmlFor="avatar-input">
//             <Avatar
//               alt="User Avatar"
//               src={userData.avatar}
//               sx={{
//                 width: 120,
//                 height: 120,
//                 fontSize: 48,
//                 cursor: "pointer",
//               }}
//             >
//               {userData.fullName.charAt(0)}
//             </Avatar>
//             <input
//               id="avatar-input"
//               type="file"
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={(e) => handleImageChange(e)}
//             />
//             <PhotoCamera fontSize="large" />
//           </label>
//         </Box>
//         <Typography variant="h4" align="center" gutterBottom>
//           {editMode.name ? (
//             <TextField
//               value={tempData.name}
//               onChange={(e) => handleInputChange(e, "name")}
//               onKeyDown={(e) => handleInputKeyPress(e, "name")}
//               sx={{
//                 width: "auto",
//               }}
//               variant="outlined"
//               onBlur={() => handleSave("name")}
//             />
//           ) : (
//             <React.Fragment>
//               {userData.fullName}
//               <Edit
//                 fontSize="small"
//                 style={{
//                   marginLeft: "0.5rem",
//                   cursor: "pointer",
//                   border: "none",
//                 }}
//                 onClick={() => handleEdit("name")}
//               />
//             </React.Fragment>
//           )}
//         </Typography>
//         <Tabs
//           value={tabValue}
//           onChange={handleTabChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//           centered
//         >
//           <Tab label="Details" />
//           <Tab label="Cart Items" />
//           <Tab label="Past Orders" />
//         </Tabs>
//         {tabValue === 0 && (
//           <Box p={3}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <Typography variant="h6">Full Name</Typography>
//                 <Typography>{userData.fullName}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="h6">Email</Typography>
//                 <Typography>{userData.email}</Typography>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="h6">Phone</Typography>
//                 {editMode.phone ? (
//                   <TextField
//                     value={tempData.phone}
//                     onChange={(e) => handleInputChange(e, "phone")}
//                     onKeyPress={(e) => handleInputKeyPress(e, "phone")}
//                     fullWidth
//                     variant="outlined"
//                     onBlur={() => handleSave("phone")}
//                   />
//                 ) : (
//                   <React.Fragment>
//                     {userData.phone}
//                     <Edit
//                       fontSize="small"
//                       style={{
//                         marginLeft: "0.5rem",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleEdit("phone")}
//                     />
//                   </React.Fragment>
//                 )}
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="h6">Address</Typography>
//                 {editMode.address ? (
//                   <TextField
//                     value={tempData.address}
//                     onChange={(e) => handleInputChange(e, "address")}
//                     onKeyPress={(e) => handleInputKeyPress(e, "address")}
//                     fullWidth
//                     variant="outlined"
//                     onBlur={() => handleSave("address")}
//                   />
//                 ) : (
//                   <React.Fragment>
//                     {userData.address}
//                     <Edit
//                       fontSize="small"
//                       style={{
//                         marginLeft: "0.5rem",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleEdit("address")}
//                     />
//                   </React.Fragment>
//                 )}
//               </Grid>
//               <Accordion
//                 expanded={expanded}
//                 onChange={() => setExpanded(!expanded)}
//                 sx={{ mt: 2 }}
//               >
//                 <AccordionSummary expandIcon={<ExpandMore />}>
//                   <Typography variant="h6">Change Password</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12}>
//                       <TextField
//                         label="Current Password"
//                         name="currentPassword"
//                         type={
//                           passwordVisibility.currentPassword
//                             ? "text"
//                             : "password"
//                         }
//                         value={passwordData.currentPassword}
//                         onChange={handlePasswordDataChange}
//                         fullWidth
//                         variant="outlined"
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <IconButton
//                                 onClick={() =>
//                                   togglePasswordVisibility("currentPassword")
//                                 }
//                                 edge="end"
//                               >
//                                 {passwordVisibility.currentPassword ? (
//                                   <VisibilityOff />
//                                 ) : (
//                                   <Visibility />
//                                 )}
//                               </IconButton>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         label="New Password"
//                         name="newPassword"
//                         type={
//                           passwordVisibility.newPassword
//                             ? "text"
//                             : "password"
//                         }
//                         value={passwordData.newPassword}
//                         onChange={handlePasswordDataChange}
//                         fullWidth
//                         variant="outlined"
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <IconButton
//                                 onClick={() =>
//                                   togglePasswordVisibility("newPassword")
//                                 }
//                                 edge="end"
//                               >
//                                 {passwordVisibility.newPassword ? (
//                                   <VisibilityOff />
//                                 ) : (
//                                   <Visibility />
//                                 )}
//                               </IconButton>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         label="Confirm New Password"
//                         name="confirmPassword"
//                         type={
//                           passwordVisibility.confirmPassword
//                             ? "text"
//                             : "password"
//                         }
//                         value={passwordData.confirmPassword}
//                         onChange={handlePasswordDataChange}
//                         fullWidth
//                         variant="outlined"
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <IconButton
//                                 onClick={() =>
//                                   togglePasswordVisibility("confirmPassword")
//                                 }
//                                 edge="end"
//                               >
//                                 {passwordVisibility.confirmPassword ? (
//                                   <VisibilityOff />
//                                 ) : (
//                                   <Visibility />
//                                 )}
//                               </IconButton>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </Grid>
//                     <Grid
//                       item
//                       xs={12}
//                       display="flex"
//                       justifyContent="center"
//                     >
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={handlePasswordChange}
//                       >
//                         Change Password
//                       </Button>
//                     </Grid>
//                   </Grid>
//                 </AccordionDetails>
//               </Accordion>
//             </Grid>
//           </Box>
//         )}
//         {tabValue === 1 && (
//           <Box p={3}>
//             <Typography variant="h6" gutterBottom>
//               Cart Items
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center">Name</TableCell>
//                     <TableCell align="center">Price</TableCell>
//                     <TableCell align="center">Quantity</TableCell>
//                     <TableCell align="center">Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {cartItems.map((item) => (
//                     <TableRow key={item.id}>
//                       <TableCell align="center">{item.label}</TableCell>
//                       <TableCell align="center">Rs. {item.price}</TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleQuantityChange(item.id, "decrease")}
//                         >
//                           <Remove />
//                         </IconButton>
//                         {item.quantity}
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleQuantityChange(item.id, "increase")}
//                         >
//                           <Add />
//                         </IconButton>
//                       </TableCell>
//                       <TableCell align="center">
//                         <Button
//                           variant="outlined"
//                           sx={{ color: "#f77", marginRight: 1 }}
//                           onClick={() => handleDeleteItem(item.id)}
//                         >
//                           <Delete />
//                         </Button>
//                         <Button
//                           variant="contained"
//                           sx={{ marginLeft: 1 }}
//                           onClick={() => handleOpenPopUp(item)}
//                         >
//                           <ShoppingCartCheckout />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         )}
//         {tabValue === 2 && (
//           <Box p={3}>
//             <Typography variant="h6" gutterBottom>
//               Past Orders
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center">Date</TableCell>
//                     <TableCell align="center">Items</TableCell>
//                     <TableCell align="center">Status</TableCell>
//                     <TableCell align="center">Payment Method</TableCell>
//                     <TableCell align="center">Total</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {orders.map((item) => (
//                     <TableRow>
//                       <TableCell align="center">{item.date}</TableCell>
//                       <TableCell align="center">{item.label}</TableCell>
//                       <TableCell align="center">{item.status}</TableCell>
//                       <TableCell align="center">{item.method}</TableCell>
//                       <TableCell align="center">Rs. {item.amount + item.deliveryCharge}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//         )}
//       </Paper>
//       {PopUp && (
//         <Overlay>
//           <OrderPopup open={PopUp} onClose={handleClosePopUp} food={selectedFood} />
//         </Overlay>
//       )}
//     </Container>
//   );
// };

// export default UserProfile;

// const Overlay = styled("div")({
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   backgroundColor: "rgba(255, 255, 255, 0.5)",
//   zIndex: 999,
// });