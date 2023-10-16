import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../store/AuthContext";

const SquareOAuth = () => {
  const [error, setError] = useState(null);
  const history = useNavigate();
  const { sellerLogin } = useAuth();

  const CLIENT_ID = process.env.REACT_APP_SQUARE_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_SQUARE_REDIRECT_URI;
  const BASE_URL = process.env.REACT_APP_SQUARE_BASE_URL;

  const handleLoginClick = () => {
    const authorizationUrl = `${BASE_URL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=ITEMS_READ ITEMS_WRITE INVENTORY_READ INVENTORY_WRITE ORDERS_READ ORDERS_WRITE PAYMENTS_READ PAYMENTS_WRITE INVOICES_READ INVOICES_WRITE`;
    window.location.href = authorizationUrl;
  };

  return (
    <Box
      backgroundImage="url('/login-bg-img.jpg')" // Make sure the image path is correct
      backgroundSize="cover"
      backgroundPosition="center"
      width="100vw"
      height="100vh" // Increase the height to make the box larger
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        p="4"
        bgColor="white"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Seller Website
        </Text>
        {error && <p>Error: {error}</p>}
        <Button
          colorScheme="blue"
          onClick={() => {
            handleLoginClick();
          }}
        >
          Login with Square
        </Button>
      </Box>
    </Box>
  );
};

export default SquareOAuth;
