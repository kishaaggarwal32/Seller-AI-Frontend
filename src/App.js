import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import SquareOAuth from "./pages/SquareOAuth";
import Catalogue from "./pages/Catalogue";
import IngredientForm from "./pages/IngredientForm";
import Inventory from "./pages/Inventory";
import Chat from "./pages/Chat";
import RecommendMenu from "./pages/RecommendMenu";

import { Wrapper } from "./components/Wrapper";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<SquareOAuth />} />
          <Route path="/" element={<Wrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/ingredientform" element={<IngredientForm />} />
            <Route path="/recommendmenu" element={<RecommendMenu />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
