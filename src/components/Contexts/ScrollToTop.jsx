import React, { useState, useEffect, useContext } from 'react';
import { IconButton } from '@mui/material';
import { ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import { ThemeContext } from "components/Contexts/ThemeContext";

const ScrollToTopButton = () => {
    const { theme } = useContext(ThemeContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        isVisible && (
            <IconButton
                onClick={handleScrollToTop}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: '1000',
                    backgroundColor: theme === 'dark' ? '#333' : '#1976d2',
                    color: theme === 'dark' ? '#fff' : '#fff'
                }}
            >
                <ArrowUpwardIcon />
            </IconButton>
        )
    );
};

export default ScrollToTopButton;
