import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, Button, TextField,Box,GlobalStyles } from '@mui/material';
import supabase from '../supabaseclient';

export const Home2 = () => {
    const { dateTaken: paramDateTaken, timePeriod: paramTimePeriod } = useParams();
    const [userId, setUserId] = useState(null);
    const [dateTaken, setDateTaken] = useState(paramDateTaken || new Date().toISOString().split('T')[0]);
    const [timePeriod, setTimePeriod] = useState(paramTimePeriod || '');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error);
                setError('Authentication error. Please log in again.');
            } else if (user) {
                setUserId(user.id);
            }
        };

        fetchUser();
    }, []);

    const handleRenew = async () => {
        setError('');
        setSuccess('');
    
        if (!userId) {
            setError('User not found. Please log in again.');
            return;
        }
    
        if (!dateTaken || !timePeriod) {
            setError('Please fill all fields.');
            return;
        }
    
        const { error } = await supabase
            .from('home')
            .update({ date_taken: dateTaken, time_period: parseInt(timePeriod) })
            .eq('id', userId);
    
        if (error) {
            console.error('Error renewing subscription:', error);
            setError('Error renewing subscription.');
        } else {
            setSuccess('Subscription renewed successfully!');
            
            // Navigate to home page after a delay to show success message
            setTimeout(() => {
                navigate('/home'); // Redirecting to the home page
            }, 2000);
        }
    };return (
        <>
          {/* Global Styles to Remove Scrollbars */}
          <GlobalStyles
            styles={{
              "html, body": {
                overflow: "hidden",
                margin: 0,
                padding: 0,
                height: "100vh",
                width: "100vw",
              },
            }}
          />
          
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: "100vh",
              background: "linear-gradient(135deg, #667eea, #764ba2)", // Modern gradient background
              padding: 3,
            }}
          >
            <Paper
              elevation={12}
              sx={{
                width: { xs: "90vw", sm: "60vw", md: "40vw" },
                padding: "2.5rem",
                borderRadius: "1rem",
                textAlign: "center",
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Soft glassmorphism effect
                backdropFilter: "blur(10px)",
                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)", // Softer shadow for depth
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="white"
                gutterBottom
                sx={{ letterSpacing: "1.5px" }} // Added letter spacing
              >
                RENEW SUBSCRIPTION
              </Typography>
      
              {error && (
                <Typography
                  variant="body1"
                  color="error"
                  sx={{
                    mb: 2,
                    backgroundColor: "#ffebee",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  {error}
                </Typography>
              )}
      
              {success && (
                <Typography
                  variant="body1"
                  color="success"
                  sx={{
                    mb: 2,
                    backgroundColor: "#e8f5e9",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  {success}
                </Typography>
              )}
      
              {!error && (
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3, // Increased spacing between elements
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="medium"
                    type="date"
                    label="Date Taken"
                    value={dateTaken}
                    onChange={(e) => setDateTaken(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "10px", // Increased padding inside input field
                        borderRadius: "0.5rem", // Rounded borders
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white", // White border
                      },
                      "& .MuiInputLabel-root": {
                        color: "white", // White label color
                        fontWeight: "bold",
                      },
                    }}
                  />
      
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="medium"
                    type="number"
                    label="Time Period (months)"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "10px",
                        borderRadius: "0.5rem",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "white",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                        fontWeight: "bold",
                      },
                    }}
                  />
      
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                      mt: 2,
                      borderRadius: "0.5rem",
                      letterSpacing: "1.2px", // Increased letter spacing for button
                      transition: "all 0.3s ease",
                      backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
                      "&:hover": {
                        backgroundImage: "linear-gradient(to right, #2575fc, #6a11cb)", // Subtle hover effect
                        transform: "scale(1.02)",
                      },
                    }}
                    onClick={handleRenew}
                  >
                    Confirm Renewal
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        </>
      );
    };      