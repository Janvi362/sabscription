/*import { Button } from '@mui/material'
import React from 'react'
export const Logout = () =>{
    const button ={ marginRight: '20px',
        fontSize: '1.2rem',
        padding: '0.3rem 1.4rem'}
    return (
<Button sx={{ backgroundColor: "white", color: "purple", "&:hover": { backgroundColor: "#f0f0f0" } }} variant="contained">
  Logout
</Button>
    )
}*/
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export const Logout = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing authentication tokens)
    
    navigate("/random"); // Redirect to the login page
  };

  return (
    <Button
      sx={{
        backgroundColor: "white",
        color: "purple",
        fontSize: "1.2rem",
        padding: "0.3rem 1.4rem",
        marginRight: "20px",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
      variant="contained"
      onClick={handleLogout} // Call function on click
    >
      Logout
    </Button>
  );
};
