import React, { useEffect, useState } from "react";

import Navbar from "../../src/components/Navbar";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  // State to store user details
  const [userDetails, setUserDetails] = useState(null);

  // You can fetch user details from your server or API here
  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        // Replace 'YOUR_ACCESS_TOKEN' with the actual access token obtained from Square
        const accessToken =
          "EAAAEIyXPTJMC-3f8hk9Ka9wORBGVrqDzmWhEOVVqWcfbZydNSdVmupkpNrnWkLe";

        // Make a GET request to the Square API endpoint for retrieving user details
        const response = await axios.get(
          "https://connect.squareup.com/v2/me", // Square API endpoint for retrieving user details
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Check if the request was successful
        if (response.status === 200) {
          const userData = response.data;
          setUserDetails(userData);
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // Call the function to fetch user details
    fetchUserDetails();
  }, []);

  return (
    <div>
      {/* Pass user details as props to the Navbar component */}
      <Navbar userDetails={userDetails} />
      <Box
        p="4"
        bgColor="white"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
        <Text fontSize="xl" fontWeight="bold" mb="4">
          Welcome to the Homepage
        </Text>
        {userDetails && (
          <div>
            <p>Welcome, {userDetails.name}!</p>
            <p>Email: {userDetails.email}</p>
            {/* Display more user details as needed */}
          </div>
        )}
      </Box>
    </div>
  );
};

export default Home;
