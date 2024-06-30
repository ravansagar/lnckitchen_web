// import { useState, useEffect, useContext } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Button,
//     IconButton,
//     Menu,
//     MenuItem,
//     Avatar,
// } from "@mui/material";
// import {
//     Home as HomeIcon,
//     Menu as MenuIcon,
//     Schedule as ScheduleIcon,
//     PersonAdd as PersonAddIcon,
//     Login as LoginIcon,
//     Logout as LogOutIcon,
//     LightModeOutlined,
//     DarkModeOutlined,
// } from "@mui/icons-material";
// import { Link, NavLink } from "react-router-dom";
// import logo from "assets/logo.png";
// import navItemsData from "JsonFiles/navItems.json";
// import { ThemeContext } from "components/Contexts/ThemeContext";
// import "./NavBar.css";
// import { AuthContext } from "components/Contexts/AuthContext";
// import { auth } from "components/LoginSignUp/firebaseConfig";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const iconMapping = {
//     HomeIcon: <HomeIcon />,
//     MenuIcon: <MenuIcon />,
//     ScheduleIcon: <ScheduleIcon />,
// };

// const NavBar = () => {
//     const { theme, toggleTheme } = useContext(ThemeContext);
//     const { user } = useContext(AuthContext);
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
//     const [visible, setVisible] = useState(true);
//     const navigate = useNavigate();

//     const handleSignOut = () => {
//         signOut(auth)
//             .then(() => {
//                 console.log("User signed out!!!");
//             })
//             .catch((error) => {
//                 console.log("Error: " + error);
//             });
//     };

//     useEffect(() => {
//         const handleResize = () => setIsMobile(window.innerWidth < 768);
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollPos = window.pageYOffset;
//             setVisible(
//                 prevScrollPos > currentScrollPos || currentScrollPos < 10
//             );
//             setPrevScrollPos(currentScrollPos);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, [prevScrollPos]);

//     const handleClick = (event) => setAnchorEl(event.currentTarget);
//     const handleClose = () => setAnchorEl(null);

//     return (
//         <nav className={`navbar ${theme}`}>
//             <AppBar
//                 position="fixed"
//                 sx={{
//                     top: visible ? 0 : "-100px",
//                     transition: "top 0.3s",
//                     backgroundColor: theme === "dark" ? "#1f1f1f" : "#1976d2",
//                     color: theme === "dark" ? "#fff" : "#000",
//                     width: "100%",
//                     maxWidth: "1280px",
//                 }}
//             >
//                 <Toolbar>
//                     {isMobile ? (
//                         <div
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 width: "100%",
//                             }}
//                         >
//                             <div style={{ flex: "1" }}>
//                                 <IconButton
//                                     edge="start"
//                                     color="inherit"
//                                     aria-label="menu"
//                                     onClick={handleClick}
//                                     sx={{
//                                         height: "2.5rem",
//                                         width: "2.5rem",
//                                         marginLeft: "2vw",
//                                     }}
//                                 >
//                                     <MenuIcon />
//                                 </IconButton>
//                             </div>
//                             <div>
//                                 <img
//                                     src={logo}
//                                     alt="Logo"
//                                     style={{
//                                         height: "3.5rem",
//                                         width: "7rem",
//                                         margin: "0",
//                                         marginRight: "1em",
//                                     }}
//                                 />
//                             </div>
//                             <div
//                                 style={{
//                                     flex: "1",
//                                     display: "flex",
//                                     justifyContent: "flex-end",
//                                 }}
//                             >
//                                 {user && (
//                                     <IconButton
//                                         edge="end"
//                                         color="inherit"
//                                         aria-label="profile"
//                                         sx={{
//                                             height: "2.5rem",
//                                             width: "2.5rem",
//                                             marginRight: "2vw",
//                                             marginTop: "0.2em",
//                                         }}
//                                         onClick={() => {
//                                             navigate("/profile");
//                                         }}
//                                     >
//                                         {user.photoURL || user.avatar ? (
//                                             <Avatar
//                                                 src={
//                                                     user.photoURL || user.avatar
//                                                 }
//                                                 alt="User"
//                                                 sx={{
//                                                     height: "3rem",
//                                                     width: "3rem",
//                                                 }}
//                                             />
//                                         ) : (
//                                             <Avatar
//                                                 sx={{
//                                                     height: "3rem",
//                                                     width: "3rem",
//                                                 }}
//                                             >
//                                                 {user.fullName.charAt(0)}
//                                             </Avatar>
//                                         )}
//                                     </IconButton>
//                                 )}
//                                 <IconButton
//                                     edge="end"
//                                     color="inherit"
//                                     aria-label="toggle dark mode"
//                                     onClick={toggleTheme}
//                                     sx={{ marginLeft: 2, marginRight: 0.5 }}
//                                 >
//                                     {theme === "dark" ? (
//                                         <LightModeOutlined
//                                             style={{
//                                                 height: "32px",
//                                                 width: "32px",
//                                             }}
//                                         />
//                                     ) : (
//                                         <DarkModeOutlined
//                                             style={{
//                                                 height: "32px",
//                                                 width: "32px",
//                                             }}
//                                         />
//                                     )}
//                                 </IconButton>
//                             </div>
//                         </div>
//                     ) : (
//                         <>
//                             <img
//                                 src={logo}
//                                 alt="Logo"
//                                 style={{
//                                     height: "5.5rem",
//                                     width: "10rem",
//                                     marginRight: "2rem",
//                                 }}
//                             />
//                             <div
//                                 style={{
//                                     flexGrow: 1,
//                                     display: "flex",
//                                     justifyContent: "center",
//                                 }}
//                             >
//                                 {navItemsData.map((item, index) => (
//                                     <Button
//                                         key={index}
//                                         color="inherit"
//                                         sx={{
//                                             padding: "1rem",
//                                             letterSpacing: "2px",
//                                             fontFamily: "Times New Roman",
//                                             fontSize: "1.5rem",
//                                         }}
//                                         component={NavLink}
//                                         to={item.path}
//                                         activeClassName="active"
//                                     >
//                                         {iconMapping[item.icon]} &nbsp;{" "}
//                                         {item.label}
//                                     </Button>
//                                 ))}
//                             </div>
//                             <IconButton
//                                 edge="end"
//                                 color="inherit"
//                                 aria-label="toggle dark mode"
//                                 onClick={toggleTheme}
//                                 sx={{ marginLeft: 2, marginRight: 4 }}
//                             >
//                                 {theme === "dark" ? (
//                                     <LightModeOutlined
//                                         style={{
//                                             height: "32px",
//                                             width: "32px",
//                                         }}
//                                     />
//                                 ) : (
//                                     <DarkModeOutlined
//                                         style={{
//                                             height: "32px",
//                                             width: "32px",
//                                         }}
//                                     />
//                                 )}
//                             </IconButton>
//                             <div
//                                 style={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                 }}
//                             >
//                                 {user ? (
//                                     <IconButton
//                                         edge="end"
//                                         color="inherit"
//                                         aria-label="profile"
//                                         sx={{
//                                             height: "3.5rem",
//                                             width: "3.5rem",
//                                             marginRight: "2vw",
//                                         }}
//                                         onClick={() => {
//                                             navigate("/profile");
//                                         }}
//                                     >
//                                         {user.photoURL || user.avatar ? (
//                                             <Avatar
//                                                 src={
//                                                     user.photoURL || user.avatar
//                                                 }
//                                                 alt="User"
//                                                 sx={{
//                                                     height: "3.5rem",
//                                                     width: "3.5rem",
//                                                 }}
//                                             />
//                                         ) : (
//                                             <Avatar
//                                                 sx={{
//                                                     height: "3.5rem",
//                                                     width: "3.5rem",
//                                                 }}
//                                             >
//                                                 {user?.fullName
//                                                     ? user.fullName.charAt(0)
//                                                     : ""}
//                                             </Avatar>
//                                         )}
//                                     </IconButton>
//                                 ) : (
//                                     <Button
//                                         color="inherit"
//                                         component={Link}
//                                         to="/login"
//                                         sx={{
//                                             border: "2px solid black",
//                                             zIndex: "1000",
//                                         }}
//                                     >
//                                         <LoginIcon /> &nbsp; Log In{" "}
//                                         <b
//                                             style={{
//                                                 margin: "0 0.2rem 0 0.2rem",
//                                                 fontSize: "1rem",
//                                             }}
//                                         >
//                                             {"/"}
//                                         </b>
//                                         <PersonAddIcon /> &nbsp; Sign Up
//                                     </Button>
//                                 )}
//                             </div>
//                         </>
//                     )}
//                     <Menu
//                         id="nav-menu"
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleClose}
//                         PaperProps={{
//                             style: {
//                                 maxHeight: "calc(100vh - 85px)",
//                                 maxWidth: "calc(50vw)",
//                                 width: "100%",
//                                 height: "100vh",
//                                 marginLeft: "-1.5em",
//                                 marginTop: "0.5em",
//                             },
//                         }}
//                         disableScrollLock
//                     >
//                         {navItemsData.map((item) => (
//                             <MenuItem key={item.label} onClick={handleClose}>
//                                 <Button
//                                     color="inherit"
//                                     component={Link}
//                                     to={item.path}
//                                     sx={{
//                                         width: "100%",
//                                         alignItems: "left",
//                                         justifyContent: "left",
//                                     }}
//                                 >
//                                     {iconMapping[item.icon]} &nbsp; {item.label}
//                                 </Button>
//                             </MenuItem>
//                         ))}
//                         {!user ? (
//                             <MenuItem onClick={handleClose}>
//                                 {!isMobile ? (
//                                     <Button
//                                         color="inherit"
//                                         component={Link}
//                                         to="/login"
//                                         sx={{
//                                             width: "100%",
//                                             alignItems: "left",
//                                             justifyContent: "left",
//                                         }}
//                                     >
//                                         &nbsp; <PersonAddIcon /> &nbsp; SignUp
//                                         &nbsp; <LoginIcon /> &nbsp; LogIn
//                                     </Button>
//                                 ) : (
//                                     <div>
//                                         <Button
//                                             color="inherit"
//                                             component={Link}
//                                             to="/signup"
//                                             sx={{
//                                                 width: "100%",
//                                                 alignItems: "left",
//                                                 justifyContent: "left",
//                                             }}
//                                         >
//                                             &nbsp; <PersonAddIcon /> &nbsp;
//                                             SignUp
//                                         </Button>
//                                         <div style={{ marginTop: "1rem" }}>
//                                             <Button
//                                                 color="inherit"
//                                                 component={Link}
//                                                 to="/login"
//                                             >
//                                                 &nbsp; <LoginIcon /> &nbsp;
//                                                 LogIn
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </MenuItem>
//                         ) : (
//                             <MenuItem onClick={handleSignOut}>
//                                 <Button
//                                     color="inherit"
//                                     sx={{
//                                         width: "100%",
//                                         alignItems: "left",
//                                         justifyContent: "left",
//                                     }}
//                                 >
//                                     <LogOutIcon /> &nbsp; Sign Out
//                                 </Button>
//                             </MenuItem>
//                         )}
//                     </Menu>
//                 </Toolbar>
//             </AppBar>
//         </nav>
//     );
// };

// export default NavBar;


import { useState, useEffect, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material";
import {
    Home as HomeIcon,
    Menu as MenuIcon,
    Schedule as ScheduleIcon,
    PersonAdd as PersonAddIcon,
    Login as LoginIcon,
    Logout as LogOutIcon,
    LightModeOutlined,
    DarkModeOutlined,
    ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import logo from "assets/logo.png";
import navItemsData from "JsonFiles/navItems.json";
import { ThemeContext } from "components/Contexts/ThemeContext";
import "./NavBar.css";
import { AuthContext } from "components/Contexts/AuthContext";
import { auth } from "components/LoginSignUp/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const iconMapping = {
    HomeIcon: <HomeIcon />,
    MenuIcon: <MenuIcon />,
    ScheduleIcon: <ScheduleIcon />,
};

const NavBar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [anchorEl, setAnchorEl] = useState(null);
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out!!!");
            })
            .catch((error) => {
                console.log("Error: " + error);
            });
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(
                prevScrollPos > currentScrollPos || currentScrollPos < 10
            );
            setPrevScrollPos(currentScrollPos);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <nav className={`navbar ${theme}`}>
            <AppBar
                position="fixed"
                sx={{
                    top: visible ? 0 : "-100px",
                    transition: "top 0.3s",
                    backgroundColor: theme === "dark" ? "#1f1f1f" : "#1976d2",
                    color: theme === "dark" ? "#fff" : "#000",
                    width: "100%",
                    maxWidth: "1280px",
                }}
            >
                <Toolbar>
                    {isMobile ? (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                width: "100%",
                            }}
                        >
                            <div style={{ flex: "1" }}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleClick}
                                    sx={{
                                        height: "2.5rem",
                                        width: "2.5rem",
                                        marginLeft: "2vw",
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <div>
                                <img
                                    src={logo}
                                    alt="Logo"
                                    style={{
                                        height: "3.5rem",
                                        width: "7rem",
                                        margin: "0",
                                        marginRight: "1em",
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    flex: "1",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {user && (
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        aria-label="profile"
                                        sx={{
                                            height: "2.5rem",
                                            width: "2.5rem",
                                            marginRight: "2vw",
                                            marginTop: "0.2em",
                                        }}
                                        onClick={() => {
                                            navigate("/profile");
                                        }}
                                    >
                                        {user.avatar || user.photoURL  ? (
                                            <Avatar
                                                src={
                                                    user.avatar || user.photoURL 
                                                }
                                                alt="User"
                                                sx={{
                                                    height: "3rem",
                                                    width: "3rem",
                                                }}
                                            />
                                        ) : (
                                            <Avatar
                                                sx={{
                                                    height: "3rem",
                                                    width: "3rem",
                                                }}
                                            >
                                                {user.fullName.charAt(0)}
                                            </Avatar>
                                        )}
                                    </IconButton>
                                )}
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    aria-label="toggle dark mode"
                                    onClick={toggleTheme}
                                    sx={{ marginLeft: 2, marginRight: 0.5 }}
                                >
                                    {theme === "dark" ? (
                                        <LightModeOutlined
                                            style={{
                                                height: "32px",
                                                width: "32px",
                                            }}
                                        />
                                    ) : (
                                        <DarkModeOutlined
                                            style={{
                                                height: "32px",
                                                width: "32px",
                                            }}
                                        />
                                    )}
                                </IconButton>
                            </div>
                        </div>
                    ) : (
                        <>
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    height: "5.5rem",
                                    width: "10rem",
                                    marginRight: "2rem",
                                }}
                            />
                            <div
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {navItemsData.map((item, index) => (
                                    <Button
                                        key={index}
                                        color="inherit"
                                        sx={{
                                            padding: "1rem",
                                            letterSpacing: "2px",
                                            fontFamily: "Times New Roman",
                                            fontSize: "1.5rem",
                                        }}
                                        component={NavLink}
                                        to={item.path}
                                        activeClassName="active"
                                    >
                                        {iconMapping[item.icon]} &nbsp;{" "}
                                        {item.label}
                                    </Button>
                                ))}
                            </div>
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="toggle dark mode"
                                onClick={toggleTheme}
                                sx={{ marginLeft: 0, marginRight: 2 }}
                            >
                                {theme === "dark" ? (
                                    <LightModeOutlined
                                        style={{
                                            height: "32px",
                                            width: "32px",
                                        }}
                                    />
                                ) : (
                                    <DarkModeOutlined
                                        style={{
                                            height: "32px",
                                            width: "32px",
                                        }}
                                    />
                                )}
                            </IconButton>
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="cart"
                                sx={{ marginLeft: 0, marginRight: 2 }}
                                component={Link} 
                                to={`/profile?tab=1`}
                            >
                                <ShoppingCartIcon
                                    style={{
                                        height: "32px",
                                        width: "32px",
                                    }}
                                />
                            </IconButton>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {user ? (
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        aria-label="profile"
                                        sx={{
                                            height: "3.5rem",
                                            width: "3.5rem",
                                            marginRight: "2vw",
                                        }}
                                        onClick={() => {
                                            navigate("/profile");
                                        }}
                                    >
                                        {user.avatar || user.photoURL  ? (
                                            <Avatar
                                                src={
                                                    user.avatar || user.photoURL
                                                }
                                                alt="User"
                                                sx={{
                                                    height: "3.5rem",
                                                    width: "3.5rem",
                                                }}
                                            />
                                        ) : (
                                            <Avatar
                                                sx={{
                                                    height: "3.5rem",
                                                    width: "3.5rem",
                                                }}
                                            >
                                                {user?.fullName
                                                    ? user.fullName.charAt(0)
                                                    : ""}
                                            </Avatar>
                                        )}
                                    </IconButton>
                                ) : (
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            border: "2px solid black",
                                            zIndex: "1000",
                                        }}
                                    >
                                        <LoginIcon /> &nbsp; Log In{" "}
                                        <b
                                            style={{
                                                margin: "0 0.2rem 0 0.2rem",
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {"/"}
                                        </b>
                                        <PersonAddIcon /> &nbsp; Sign Up
                                    </Button>
                                )}
                            </div>
                        </>
                    )}
                    <Menu
                        id="nav-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: "calc(100vh - 85px)",
                                maxWidth: "calc(50vw)",
                                width: "100%",
                                height: "100vh",
                                marginLeft: "-1.5em",
                                marginTop: "0.5em",
                            },
                        }}
                        disableScrollLock
                    >
                        {navItemsData.map((item) => (
                            <MenuItem key={item.label} onClick={handleClose}>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={item.path}
                                    sx={{
                                        width: "100%",
                                        alignItems: "left",
                                        justifyContent: "left",
                                    }}
                                >
                                    {iconMapping[item.icon]} &nbsp; {item.label}
                                </Button>
                            </MenuItem>
                        ))}
                        {!user ? (
                            <MenuItem onClick={handleClose}>
                                {!isMobile ? (
                                    <Button
                                        color="inherit"
                                        component={Link}
                                        to="/login"
                                        sx={{
                                            width: "100%",
                                            alignItems: "left",
                                            justifyContent: "left",
                                        }}
                                    >
                                        &nbsp; <PersonAddIcon /> &nbsp; SignUp
                                        &nbsp; <LoginIcon /> &nbsp; LogIn
                                    </Button>
                                ) : (
                                    <div>
                                        <Button
                                            color="inherit"
                                            component={Link}
                                            to="/signup"
                                            sx={{
                                                width: "100%",
                                                alignItems: "left",
                                                justifyContent: "left",
                                            }}
                                        >
                                            &nbsp; <PersonAddIcon /> &nbsp;
                                            SignUp
                                        </Button>
                                        <div style={{ marginTop: "1rem" }}>
                                            <Button
                                                color="inherit"
                                                component={Link}
                                                to="/login"
                                            >
                                                &nbsp; <LoginIcon /> &nbsp;
                                                LogIn
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={handleSignOut}>
                                <Button
                                    color="inherit"
                                    sx={{
                                        width: "100%",
                                        alignItems: "left",
                                        justifyContent: "left",
                                    }}
                                >
                                    <LogOutIcon /> &nbsp; Sign Out
                                </Button>
                            </MenuItem>
                        )}
                    </Menu>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default NavBar;