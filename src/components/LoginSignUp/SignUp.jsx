import React, { useState, useEffect } from "react";
import handleGoogleSignIn from "./continueWithGoogle";
import {
  CssVarsProvider,
  useColorScheme,
  GlobalStyles,
  CssBaseline,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Typography,
  Stack,
  Link,
} from "@mui/joy";
import { DarkModeRounded, LightModeRounded, VisibilityRounded, VisibilityOffRounded } from "@mui/icons-material";
import GoogleIcon from "assets/GoogleIcon";
import Logo from "assets/logo.png";
import { CreateUser } from "./RegisterContext";
import { useAlert } from "components/Contexts/AlertContext";
import { useNavigate } from "react-router-dom";

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      sx={{
        height: "32px",
        width: "32px",
        borderRadius: "50%",
      }}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPass, setShowPass] = useState(false);
  const {showAlert} = useAlert();
  const navigate = useNavigate();
  const handleShowPass = () => setShowPass((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showAlert("Password doesn't match", 'error');
      return;
    }
    try {
      await CreateUser(email, password, name, phone, address, showAlert);
      navigate('/login'); 
    } catch (error) {
      showAlert(`Error creating user: ${error}`, "error");
    }
  };

  const handleGoogleSignInClick = () => {
    handleGoogleSignIn(navigate);
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          marginTop: "-100px",
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 1)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "#000",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton variant="soft" color="none" size="sm">
                  <img
                    src={Logo}
                    alt="logo"
                    height="75px"
                    width="150px"
                    color="#fff"
                  />
                </IconButton>{" "}
                &nbsp; &nbsp;
                <Typography component="h1" level="h2" textAlign="center" zIndex="10">
                  Late Night Cloud Kitchen <br />{" "}
                  <span style={{ fontSize: "20px" }}> & Delivery Services </span>
                </Typography>
              </a>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={3} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{" "}
                  <Link href="\login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
              <Stack gap={2} sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <Typography
                      sx={{
                        color: "#f00",
                        fontSize: "0.75em",
                      }}
                      textAlign="left"
                    >
                      Note: * indicates required fields.
                    </Typography>
                    <Stack gap={2} sx={{ mt: 2 }}>
                      <FormControl required>
                        <FormLabel>
                          Full Name <sup style={{ color: "red" }}>*</sup>{" "}
                        </FormLabel>
                        <Input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Itachi Uchiha"
                          required
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel>
                          Phone <sup style={{ color: "red" }}>*</sup>{" "}
                        </FormLabel>
                        <Input
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="9xxxxxxxxx"
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>
                          Email<sup style={{ color: "red" }}>*</sup>
                        </FormLabel>
                        <Input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="uchihaitachi@konohagakure.com"
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel>
                          Password <sup style={{ color: "red" }}>*</sup>{" "}
                        </FormLabel>
                        <Input
                          type={showPass ? "text" : "password"}
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="thisIsSecreate"
                          required
                          endDecorator={
                            <Button
                              onClick={handleShowPass}
                              sx={(theme) => ({
                                [theme.getColorSchemeSelector("dark")]: {
                                  backgroundColor: "#000",
                                  color: "#fff",
                                },
                                [theme.getColorSchemeSelector("light")]: {
                                  backgroundColor: "#fff",
                                  color: "#000",
                                },
                              })}
                            >
                              {!showPass ? (
                                <VisibilityOffRounded />
                              ) : (
                                <VisibilityRounded />
                              )}
                            </Button>
                          }
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel>
                          Confirm Password <sup style={{ color: "red" }}>*</sup>{" "}
                        </FormLabel>
                        <Input
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </FormControl>
                      <FormControl required>
                        <FormLabel>
                          Address <sup style={{ color: "red" }}>*</sup>{" "}
                        </FormLabel>
                        <Input
                          type="text"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="thisHasTobeSame"
                          required
                        />
                      </FormControl>
                      <Button type="submit" fullWidth>
                        Sign up
                      </Button>
                    </Stack>
                  </div>
                </form>
              </Stack>
              <Divider
                sx={(theme) => ({
                  [theme.getColorSchemeSelector("light")]: {
                    color: {
                      xs: "#FFF",
                      md: "text.tertiary",
                    },
                  },
                })}
              >
                or
              </Divider>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
                onClick={handleGoogleSignInClick}
              >
                Continue with Google
              </Button>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © lncKitchen {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition: "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </CssVarsProvider>
  );
};

export default SignUpForm;
