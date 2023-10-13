import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import { AuthProvider } from "../src/context/authContext";

import SquareOAuth from "../src/pages/SquareOAuth"; // Import your SquareOAuth component
import Catalogue from "./pages/Catalogue";
import IngredientForm from "./pages/IngredientForm";
import Inventory from "./pages/Inventory";
import Chat from "./pages/Chat";
import RecommendMenu from "../src/pages/RecommendMenu";

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
            <Route path="/ingredientform" element={<IngredientForm />} />
            <Route path="/recommendmenu" element={<RecommendMenu />} />

            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
