import { useContext, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Menu from "./components/Menus/Menu";
import TimesPage from "./components/Times/Times";
import Footer from "./components/Footer/Footer";
import SignIn from "./components/LoginSignUp/SignIn";
import SignUpForm from "./components/LoginSignUp/SignUp";
import { ThemeContext, ThemeProvider } from "./components/Contexts/ThemeContext";
import DynamicHomePage from './components/DynamicHomePage/DynamicHome';
import NavBar from "./components/NavBar/NavBar";
import { AuthContext ,AuthProvider } from "./components/Contexts/AuthContext";
import ProfileDashboard from "./components/ProfileDashboard/UserDashboard";
import ScrollToTopButton from "components/Contexts/ScrollToTop";
import { AlertProvider } from 'components/Contexts/AlertContext';
import { KhaltiPaymentProvider } from "components/Contexts/KhaltiPaymentContext";
import { TransactionProvider } from "components/Contexts/TransactionContext";
import ESewaSuccessFromURL from "components/HandleOrder/eSewaSuccess";

const categoryImages = {
    veg: "./images/chilliPaneer.jpeg",
    nonVeg: "./images/manchurian.jpeg",
    fastFood: "./images/chowmein.jpeg",
};

function AppContent() {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const muiTheme = createTheme({
        palette: {
            mode: theme,
        },
    });

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const location = useLocation();
    const LoginPage = location.pathname === "/login";
    const SignUpPage = location.pathname === "/signup";
    const UserProfile = location.pathname === "/profile";
    const success = location.pathname === "/success";

    return (
        <MuiThemeProvider theme={muiTheme}>
            <div style={{ marginTop: "100px" }}>
                {!(LoginPage || SignUpPage || UserProfile || success) && <NavBar />}

                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames="slide"
                        timeout={300}
                    >
                        <div className="route-container">
                            <Routes location={location}>
                                <Route path="/profile" element={<ProfileDashboard user={user} />} />
                                <Route
                                    path="/menus"
                                    element={
                                        <>
                                            <Menu user={user} categoryImages={categoryImages} />
                                            <Footer />
                                        </>
                                    }
                                />
                                <Route
                                    path="/times"
                                    element={
                                        <>
                                            <TimesPage />
                                            <Footer />
                                        </>
                                    }
                                />
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <>
                                            <DynamicHomePage />
                                            <Footer />
                                        </>
                                    }
                                />
                                <Route path="/login" element={<SignIn />} />
                                <Route path="/signup" element={<SignUpForm prvMode={theme} />} />
                                <Route path="/success" element={<ESewaSuccessFromURL  user={user}/>} />
                            </Routes>
                            <ScrollToTopButton />
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </MuiThemeProvider>
    );
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <TransactionProvider>
                <KhaltiPaymentProvider>
                <AlertProvider>
                <Router>
                    <AppContent />
                </Router>
                </AlertProvider>
                </KhaltiPaymentProvider>
                </TransactionProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
