import React, { useState } from 'react';
import { Grid, Paper, TextField, Typography, Button,GlobalStyles } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseclient';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !email || !password) {
      setError('Please fill all fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      // Sign up the user in Supabase Authentication
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },  // ✅ Correct way to add additional user metadata
       },
      });
      console.log(data,signUpError);
      // const { data, error } = await supabase
      //.from("signup")
      //.insert([
        //{ 
          //username: username, 
          //email: email, 
          //password: password
        //}
      //])
      //.select();
        

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Save user details in the 'signup' table
      //const { error: insertError } = await supabase
        //.from('signup')
        //.insert([{ email ,password}]);

      //if (insertError) {
       // setError(insertError.message);
       // return;
     // }

      // Success message & Redirect to Home
      setSuccess('Signup successful! Redirecting to home...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
        console.error(err);
      if (err.status === 429) {
        setError('Too many requests. Please try again later.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
return (
    <>
      {/* Global Styles to Prevent Scrollbars */}
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
          overflow: "hidden",
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
            Signup
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter Name"
              type="text"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              label="Enter Email"
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
              label="Enter Password"
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
            {success && (
              <Typography color="primary" sx={{ mb: 2 }}>
                {success}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                padding: "0.8rem",
                fontSize: "1.2rem",
                fontWeight: "700",
                borderRadius: "0.8rem",
                background: "#6a11cb",
                backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
                "&:hover": { backgroundImage: "linear-gradient(to right, #2575fc, #6a11cb)" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Signup"}
            </Button>
          </form>
          <Typography sx={{ marginTop: "1rem", color: "white" }}>
            Already have an account?
            <Button
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", fontWeight: "600", color: "#f8f8f8" }}
            >
              Login
            </Button>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};