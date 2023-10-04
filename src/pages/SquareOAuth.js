import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Text } from "@chakra-ui/react";

const SquareOAuth = () => {
  const [error, setError] = useState(null);
  const history = useNavigate();

  const CLIENT_ID = "sandbox-sq0idb-qqw1PDXOq16d403omj_1_g";
  const REDIRECT_URI = "http://localhost:3000/auth/v1/callback";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const requestData = {
        client_id: CLIENT_ID,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      };

      fetch("https://connect.squareup.com/oauth2/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          history("/dashboard");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [history]);

  const handleLoginClick = () => {
    const authorizationUrl = `https://connect.squareup.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
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
        <Button colorScheme="blue" onClick={handleLoginClick}>
          Login with Square
        </Button>
      </Box>
    </Box>
  );
};

export default SquareOAuth;
