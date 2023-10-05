import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import { AuthProvider } from "../src/context/authContext";

import SquareOAuth from "../src/pages/SquareOAuth"; // Import your SquareOAuth component
import Catalogue from "./pages/Catalogue";
import Inventory from "./pages/Inventory";
import Chat from "./pages/Chat";
import { Wrapper } from "./components/Wrapper";

// function Dashboard() {
//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <Outlet />
//     </div>
//   );
// }

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<SquareOAuth />} />

            <Route path="/dashboard" element={<Home />} />

            <Route path="/" element={<Wrapper />}>
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </div>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
