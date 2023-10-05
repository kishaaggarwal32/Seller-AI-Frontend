import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import SquareOAuth from "../src/pages/SquareOAuth";
import Home from "./pages/Home";
import { AuthProvider } from "../src/context/authContext";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<SquareOAuth />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </div>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
