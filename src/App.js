import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes and Route
import { ChakraProvider } from "@chakra-ui/react";
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
    <ChakraProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<SquareOAuth />} />
            <Route path="/" element={<Wrapper />}>
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
