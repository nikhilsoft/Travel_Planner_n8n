// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./components/Home";
import NavBar from "./components/NavBar"; // Assuming you have a navigation bar
import TravelPlan from "./pages/TravelPlan";
// import NumberInput from '../src/components/'

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#42a5f5" },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
