import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import SquareOAuth from "./pages/SquareOAuth";
import CatalogList from "./pages/CatalogList";
import IngredientForm from "./pages/IngredientForm";
import Inventory from "./pages/Inventory";
import Chat from "./pages/Chat";
import RecommendMenu from "./pages/RecommendMenu";
import IngredientsList from "./pages/IngredientsList";

import { Wrapper } from "./components/Wrapper";
import SquareRedirect from "./pages/SquareRedirect";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<SquareOAuth />} />
          <Route path="/" element={<Wrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-ingredients" element={<IngredientForm />} />
            <Route path="/ingredients" element={<IngredientsList />} />
            <Route path="/recommend-menu" element={<RecommendMenu />} />
            <Route path="/catalogs" element={<CatalogList />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/square-redirect" element={<SquareRedirect />} />
          </Route>
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
