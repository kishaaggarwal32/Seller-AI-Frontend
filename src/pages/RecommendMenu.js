import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  Stack,
  HStack,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { backendAPIInstance } from "../constants/axios";
import MyModal from "../components/Modal";

const cuisines = [
  "Indian",
  "Mexican",
  "Italian",
  "French",
  "Chinese",
  "lebanese",
  "Arabic",
  "Thai",
  "Japanese",
  "Korean",
];

const time = [
  "5 mins",
  "10 mins",
  "15 mins",
  "20 mins",
  "30 mins",
  "45 mins",
  "1 hour",
];

const tempDishes = [
  {
    category: "breakfast",
    items: [
      {
        name: "tamagoyaki extra nori",
        price: 6.5,
      },
      {
        name: "tamagoyaki extra soy sauce",
        price: 6.5,
      },
      {
        name: "miso soup",
        price: 5,
      },
      {
        name: "onigiri salmon filling",
        price: 7,
      },
      {
        name: "onigiri umeboshi filling",
        price: 7,
      },
    ],
  },
  {
    category: "lunch",
    items: [
      {
        name: "ramen extra noodles",
        price: 12,
      },
      {
        name: "ramen no green onions",
        price: 12,
      },
      {
        name: "sushi platter",
        price: 15.5,
      },
      {
        name: "tempura udon extra tempura",
        price: 13,
      },
    ],
  },
  {
    category: "dinner",
    items: [
      {
        name: "yakitori extra skewers",
        price: 14,
      },
      {
        name: "yakitori less salt",
        price: 14,
      },
      {
        name: "sashimi platter",
        price: 18.5,
      },
      {
        name: "sukiyaki extra tofu",
        price: 16,
      },
    ],
  },
  {
    category: "dessert",
    items: [
      {
        name: "mochi ice cream",
        price: 5.5,
      },
      {
        name: "matcha cheesecake",
        price: 6,
      },
      {
        name: "dorayaki",
        price: 4.5,
      },
    ],
  },
  {
    category: "drinks",
    items: [
      {
        name: "green tea",
        price: 2,
      },
      {
        name: "sake",
        price: 7.5,
      },
      {
        name: "matcha latte",
        price: 4,
      },
    ],
  },
  {
    category: "sides",
    items: [
      {
        name: "edamame",
        price: 3,
      },
      {
        name: "gyoza",
        price: 5,
      },
      {
        name: "takoyaki",
        price: 6,
      },
    ],
  },
  {
    category: "breads",
    items: [
      {
        name: "melon pan",
        price: 2.5,
      },
      {
        name: "anpan",
        price: 2,
      },
      {
        name: "yakisoba pan",
        price: 3,
      },
    ],
  },
];
const RecommendMenu = () => {
  const [formData, setFormData] = useState({
    preferred_cuisine: cuisines[0],
    prep_time_breakfast: time[2],
    prep_time_lunch: time[4],
    prep_time_dinner: time[5],
    cook_time_breakfast: time[2],
    cook_time_lunch: time[4],
    cook_time_dinner: time[5],
  });

  const [dishes, setDishes] = useState(tempDishes);

  const [isMenuGenerateLoading, setIsMenuGenerateLoading] = useState(false);

  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchRecommendedMenu = async () => {
    setIsMenuGenerateLoading(true);
    try {
      const data = new URLSearchParams(formData).toString();

      const response = await backendAPIInstance.post(
        "/seller/recommend_menu",
        data
      );

      console.log("response -->", response.data);
      const dishesToShow = [];
      for (const [key, value] of Object.entries(response.data)) {
        const arr = [];
        for (const [dishName, dish] of Object.entries(value)) {
          if (dish.customization) {
            dish.customization.forEach((item) => {
              const newItem = {
                name: `${dishName} ${item}`,
                price: dish.price,
              };
              arr.push(newItem);
            });
          } else {
            const newItem = { name: dishName, price: dish.price };
            arr.push(newItem);
          }
        }
        dishesToShow.push({ category: key, items: arr });
      }
      setIsMenuGenerateLoading(false);
      setDishes(dishesToShow);

      console.log("dishesToShow -->", dishesToShow);
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

  const reEngineerDish = async (dishName, catIndex, itemIndex) => {
    try {
      const data = new URLSearchParams({
        dish_name: dishName,
        preferred_cuisine: formData.preferred_cuisine,
      }).toString();

      const response = await backendAPIInstance.post(
        "/seller/reengineer_dish",
        data
      );

      console.log("respons in reengineer -->", response.data);
      // const updatedDish = response.data;

      const updatedDish = [...dishes];
      updatedDish[catIndex].items[itemIndex].name = response.data.dish;
      updatedDish[catIndex].items[itemIndex].price = response.data.price;

      console.log("updatedDish -->", updatedDish);
      setDishes(updatedDish);
      toast({
        title: "Re Engineer.",
        description: "Dish re-engineered successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-center",
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

  const addToCatalog = async (name, price) => {
    const res = await backendAPIInstance.post(
      "/catalog/create",
      {
        name: name,
        price: Math.ceil(price),
      },
      {
        headers: {
          "access-token":
            "EAAAEBg6wBSg6FOgpKQXsceHjsOeYnRDHDy9Ce8lWE4rZdRvAAU56n8ayoiBMwxs",
        },
      }
    );

    console.log("res in add to catalog -->", res.data);
    toast({
      title: "Add To Catalog.",
      description: "Dish added to catalog successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-center",
    });
  };

  return (
    <Box p="4">
      <Stack spacing="4">
        <VStack>
          <Text>Preferred Cuisine</Text>
          <Select
            name="preferred_cuisine"
            onChange={handleChange}
            value={formData.preferred_cuisine}
          >
            {cuisines.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </VStack>
        <HStack spacing={4}>
          <VStack>
            <Text>Prep Time (Breakfast)</Text>
            <Select
              name="prep_time_breakfast"
              onChange={handleChange}
              value={formData.prep_time_breakfast}
            >
              {time.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </VStack>
          <VStack>
            <Text>Prep Time (Lunch)</Text>
            <Select
              name="prep_time_lunch"
              onChange={handleChange}
              value={formData.prep_time_lunch}
            >
              {time.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </VStack>
          <VStack>
            <Text>Prep Time (Dinner)</Text>
            <Select
              name="prep_time_dinner"
              onChange={handleChange}
              value={formData.prep_time_dinner}
            >
              {time.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </VStack>
          <VStack>
            <Text> Cook Time (Breakfast)</Text>
            <Select
              name="cook_time_breakfast"
              value={formData.cook_time_breakfast}
              onChange={handleChange}
              required
            >
              {time.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </VStack>
          <VStack>
            <Text> Cook Time (Lunch)</Text>
            <Select
              name="cook_time_lunch"
              value={formData.cook_time_lunch}
              onChange={handleChange}
              required
            >
              {time.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </VStack>
          <VStack>
            <Text> Cook Time (Dinner)</Text>
            <Select
              name="cook_time_dinner"
              value={formData.cook_time_dinner}
              onChange={handleChange}
              required
            >
              {time.map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </VStack>
        </HStack>
      </Stack>
      <Button
        marginTop={"20px"}
        colorScheme="teal"
        loadingText="Generating Menu"
        isLoading={isMenuGenerateLoading}
        onClick={fetchRecommendedMenu}
      >
        Get Recommended Menu
      </Button>

      {dishes.length > 0 &&
        dishes.map((category, index) => {
          return (
            <Box key={index} marginTop={"20px"}>
              <Text fontSize={"20px"} variant={"bold"} as="b">
                {category.category}
              </Text>
              <HStack spacing="4">
                {category.items.map((item, _index) => (
                  <Box key={_index}>
                    <Text>{item.name}</Text>
                    <Text>Price: {item.price}</Text>
                    <Button
                      size="xs"
                      colorScheme="teal"
                      marginRight={"10px"}
                      onClick={() => reEngineerDish(item.name, index, _index)}
                    >
                      Re Engineer
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="pink"
                      onClick={() => {
                        addToCatalog(item.name, item.price);
                      }}
                    >
                      Add to Catalog
                    </Button>
                  </Box>
                ))}
              </HStack>
            </Box>
          );
        })}
    </Box>
  );
};

export default RecommendMenu;
