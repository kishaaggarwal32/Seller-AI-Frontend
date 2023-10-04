import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import { ChakraProvider } from "@chakra-ui/react";
import SquareOAuth from "../src/pages/SquareOAuth"; // Import your SquareOAuth component

function App() {
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<SquareOAuth />} />
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
