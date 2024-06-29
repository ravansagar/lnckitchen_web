// Importing Dependencies
import React, { useContext } from "react";
import { Grid, Typography, Link } from "@mui/material";
import { Facebook, Instagram, WhatsApp } from "@mui/icons-material";
import Massanger from "assets/FMassanger.svg";
import "./FooterStyle.css";
import { ThemeContext } from "components/Contexts/ThemeContext";
import { NavLink } from "react-router-dom";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Developed by: © "}
            <Link
                color="inherit"
                href="https://www.sagarthakur.com.np/"
                style={{ textDecoration: "none" }}
            >
                Sagar Thakur
            </Link>{" "}
            &nbsp; {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const Footer = () => {
    const { theme } = useContext(ThemeContext);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <footer className={`footer foo-margin ${theme === 'dark' ? 'dark' : 'light'}`}>
            <Grid container justifyContent="space-between" alignItems="center" top = '0' >
                <Grid item xs={12} sm={4} md={3} className="footer-about">
                    <Typography variant="h5 " className="footer-heading">
                        About Us
                    </Typography>
                    <Typography className="footer-text">
                        We are a team of passionate individuals dedicated to
                        providing the best food within the town and some near
                        areas.
                    </Typography>
                    <div className="social-links">
                        <Link href="#" color="inherit" className="social-icon">
                            <Facebook />
                        </Link>
                        <Link href="#" color="inherit" className="social-icon">
                            <Instagram />
                        </Link>
                        <Link
                            href="#"
                            color="inherit"
                            className="social-icon"
                            style={{
                                width: "21px",
                                height: "21px",
                                padding: "0",
                                marginTop: "4px",
                                filter:
                                    theme === "dark"
                                        ? "invert(1)"
                                        : "invert(0)",
                            }}
                        >
                            <span style={{ padding: "0.2em" }}></span>
                            <img src={Massanger} alt="facebook-messenger--v1" />
                        </Link>
                        <span style={{ padding: "0.2em" }}></span>
                        <Link
                            href="https://wa.me/+9779846694345"
                            color="inherit"
                            className="social-icon"
                        >
                            <WhatsApp />
                        </Link>
                    </div>
                </Grid>
                <Grid item xs={12} sm={4} md={3} className="footer-contact">
                    <Typography variant="h5" className="footer-heading">
                        Contact Us
                    </Typography>
                    <Typography className="footer-text">
                        Address: C7WG+4CQ, Shakti Marg, Biratnagar 56613
                    </Typography>
                    <Typography className="footer-text">
                        Phone:{" "}
                        <a
                            href="tel:+9779846694345"
                            style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#000" }}
                        >
                            (984) 669-4345
                        </a>
                    </Typography>
                    <Typography className="footer-text">
                        Email:{" "}
                        <a
                            href="mailto:lnck.ds@yahoo.com"
                            style={{ textDecoration: "none", color: theme === "dark" ? "#fff" : "#000" }}
                        >
                            lnck.ds@yahoo.com
                        </a>
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2} className="footer-links">
                    <Typography variant="h5" className="footer-heading">
                        Useful Links
                    </Typography>
                     <NavLink
                to="/"
                className="footer-link"
                style={{
                    color: theme === "dark" ? "#fff" : "#000",
                }}
                activeStyle={{
                    fontWeight: "bold", 
                }}
                onClick={scrollToTop}
            >
                Home
            </NavLink>
            <NavLink
                to="/menus"
                className="footer-link"
                style={{
                    color: theme === "dark" ? "#fff" : "#000",
                }}
                activeStyle={{
                    fontWeight: "bold",
                }}
                onClick={scrollToTop}
            >
                Menus
            </NavLink>
            <NavLink
                to="/times"
                className="footer-link"
                style={{
                    color: theme === "dark" ? "#fff" : "#000",
                }}
                activeStyle={{
                    fontWeight: "bold", 
                }}
                onClick={scrollToTop}
            >
                Times
            </NavLink>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <div className="mapContainer">
                        <iframe
                            title="Map-of-Kitchen"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d893.0801268240539!2d87.27550846956458!3d26.445395799328804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef744c0d837633%3A0xa17239b965153b3f!2sC7WG%2B4CQ%2C%20Shakti%20Marg%2C%20Biratnagar%2056613!5e0!3m2!1sen!2snp!4v1716611182754!5m2!1sen!2snp"
                            width="auto"
                            height="200"
                            style={{ border: "none" }}
                            allowfullscreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </Grid>
                <Copyright
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100vw",
                    }}
                />
            </Grid>
        </footer>
    );
};

export default Footer;
