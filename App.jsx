import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { Home } from './Components/Home';
import { Home2 } from './Components/Home2';
import { Navbar } from './Components/Navbar';
import { Random } from './Components/random';
 
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home2" element={<Home2 />} />
        <Route path="/random" element={<Random />} />
        
        {/* Redirect to login if no route matches */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
