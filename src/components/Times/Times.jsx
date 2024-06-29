// Importing Dependencies
import React, {useContext} from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DocumentTitle from 'components/Contexts/DocumentTitle';
import { ThemeContext } from 'components/Contexts/ThemeContext';
const TimesPage = () => {
  DocumentTitle("Times::lncKitchen");
  const { theme } = useContext(ThemeContext);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <ThemeProvider theme={muiTheme}>
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center' }}>
        <AccessTimeIcon sx={{ fontSize: 80, color: '#1976d2' }} />
        <Typography variant="h4" gutterBottom>
          We're Open 24/7
        </Typography>
        <Typography variant="h6" color="textPrimary">
          "We  <b><i>Late Night Cloud Kitchen & Delivery Services</i></b> warmly welcomes you around the clock, offering delivery service 24/7 within town and nearby areas. Whenever hunger strikes, day or night, count on us to fulfill your cravings. We're here to serve you, no matter if it's day or night."
        </Typography>
        <Box sx={{ marginTop: '2rem' }}>
          <Typography variant="h5" gutterBottom>
            Weekly Schedule
          </Typography>
          
          <Grid container spacing={2}>
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <Grid item xs={12} sm={6} md={4} key={day}>
                
                <Paper sx={{ padding: '1rem', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
                <ThemeProvider theme={muiTheme}>
                  <Typography variant="h6">{day}</Typography>
                  <Typography variant="body1">Open 24 hours</Typography>
                  </ThemeProvider>
                </Paper>
                
              </Grid>
            ))}
          </Grid>
          
        </Box>
      </Paper>
    </Container>
    </ThemeProvider>
  );
};

export default TimesPage;