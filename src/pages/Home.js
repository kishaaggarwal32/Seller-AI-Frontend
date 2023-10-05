import React, { useEffect, useState } from "react";

import Navbar from "../../src/components/Navbar";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Function to fetch user details
    const fetchUserDetails = async () => {
      try {
        const accessToken =
          "EAAAEIyXPTJMC-3f8hk9Ka9wORBGVrqDzmWhEOVVqWcfbZydNSdVmupkpNrnWkLe";

        const response = await axios.get("https://connect.squareup.com/v2/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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

    fetchUserDetails();
  }, []);

  return (
    <div>
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
          </div>
        )}
      </Box>
    </div>
  );
};

export default Home;
