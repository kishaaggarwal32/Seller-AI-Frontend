import React, { useState } from "react";
import { Box, Button, Text, Input, Stack } from "@chakra-ui/react";
import axios from "axios";

const RecommendMenu = () => {
  const [formData, setFormData] = useState({
    preferred_cuisine: "",
    prep_time_breakfast: "",
    prep_time_lunch: "",
    prep_time_dinner: "",
    cook_time_breakfast: "",
    cook_time_lunch: "",
    cook_time_dinner: "",
  });

  const [dishes, setDishes] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const BASE_URL = "https://8873-107-159-16-99.ngrok-free.app"; // Update with your API URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchRecommendedMenu = async () => {
    try {
      const data = new URLSearchParams(formData).toString();

      const response = await axios.post(
        `${BASE_URL}/seller/recommend_menu`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );

      // Extract dish names and prices from the response
      const extractedDishes = [];
      for (const meal in response.data) {
        for (const dishName in response.data[meal]) {
          const dish = response.data[meal][dishName];
          const name = dishName;
          const price = dish.price;
          extractedDishes.push({ name, price });
        }
      }

      // Update the dishes state with the extracted data
      setDishes(extractedDishes);
    } catch (error) {
      if (error.response) {
        // Handle validation errors or other HTTP errors
        console.error("Error fetching recommended menu: ", error.response.data);
      } else if (error.request) {
        // Handle network errors
        console.error("Network error: ", error.request);
      } else {
        // Handle other errors
        console.error("An error occurred: ", error.message);
      }
    }
  };

  const reEngineerDish = async (dishName) => {
    try {
      const data = new URLSearchParams({
        dish_name: dishName,
        preferred_cuisine: formData.preferred_cuisine,
      }).toString();

      const response = await axios.post(
        `${BASE_URL}/seller/reengineer_dish`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        }
      );

      const updatedDish = response.data;

      setDishes((prevDishes) => {
        const updatedDishes = prevDishes.map((dish) => {
          if (dish.name === dishName) {
            return updatedDish;
          }
          return dish;
        });
        return updatedDishes;
      });
    } catch (error) {
      if (error.response) {
        // Handle validation errors or other HTTP errors
        console.error("Error re-engineering dish: ", error.response.data);
      } else if (error.request) {
        // Handle network errors
        console.error("Network error: ", error.request);
      } else {
        // Handle other errors
        console.error("An error occurred: ", error.message);
      }
    }
  };

  const addToCatalog = () => {
    const catalogItem = dishes.map((dish) => ({
      name: dish.name,
      price: dish.price,
    }));
    setCatalog([...catalog, ...catalogItem]);
  };

  return (
    <Box p="4">
      <Stack spacing="4">
        <Input
          name="preferred_cuisine"
          placeholder="Preferred Cuisine"
          onChange={handleChange}
          value={formData.preferred_cuisine}
        />
        <Input
          name="prep_time_breakfast"
          placeholder="Prep Time (Breakfast)"
          onChange={handleChange}
          value={formData.prep_time_breakfast}
        />
        <Input
          name="prep_time_lunch"
          placeholder="Prep Time (Lunch)"
          onChange={handleChange}
          value={formData.prep_time_lunch}
        />
        <Input
          name="prep_time_dinner"
          placeholder="Prep Time (Dinner)"
          onChange={handleChange}
          value={formData.prep_time_dinner}
        />
        <Input
          name="cook_time_breakfast"
          placeholder="Cook Time (Breakfast)"
          onChange={handleChange}
          value={formData.cook_time_breakfast}
        />
        <Input
          name="cook_time_lunch"
          placeholder="Cook Time (Lunch)"
          onChange={handleChange}
          value={formData.cook_time_lunch}
        />
        <Input
          name="cook_time_dinner"
          placeholder="Cook Time (Dinner)"
          onChange={handleChange}
          value={formData.cook_time_dinner}
        />
      </Stack>
      <Button onClick={fetchRecommendedMenu}>Get Recommended Menu</Button>

      <Stack spacing="4">
        {dishes.map((dish, index) => (
          <Box key={index}>
            <Text>{dish.name}</Text>
            <Text>Price: {dish.price}</Text>
            <Button onClick={() => reEngineerDish(dish.name)}>
              Re-engineer
            </Button>
          </Box>
        ))}
      </Stack>
      <Button onClick={addToCatalog}>Add to Catalog</Button>

      <Stack spacing="4">
        {catalog.map((item, index) => (
          <Box key={index}>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RecommendMenu;
