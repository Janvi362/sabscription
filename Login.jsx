import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Button, CircularProgress,GlobalStyles } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseclient';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      // Authenticate user with Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    console.log(data,loginError);
      //debugger;
      if (loginError) {
        setError('Invalid email or password. Please try again.');
      } else if (data.user) {
        // Check if the email is confirmed
        if (!data.user.email_confirmed_at) {
          setError('Please verify your email before logging in.');
        } else {
          navigate('/home'); // Redirect to home on successful login
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };
  return (
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
          height: "100vh",
          width: "100vw",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: { xs: "90vw", sm: "60vw", md: "40vw", lg: "30vw" },
            padding: "3rem",
            borderRadius: "1.5rem",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            boxShadow: "5px 5px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h4" fontWeight="600" color="white" mb={2}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.8rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.8rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                },
                "& .MuiInputLabel-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
              }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "100%",
                padding: "0.8rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                borderRadius: "0.8rem",
                background: "#6a11cb",
                backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
                "&:hover": { backgroundImage: "linear-gradient(to right, #2575fc, #6a11cb)" },
              }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};