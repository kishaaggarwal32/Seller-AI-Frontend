import { useState, useCallback } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import SummaryModal from "../components/SummaryModal";

function IngredientForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [summary, setSummary] = useState("");
  const API_BASE_URL = "https://8661-107-159-16-99.ngrok-free.app";
  const [ingredient, setIngredient] = useState({
    ingredient_name: "",
    ingredient_type: "",
    ingredient_sub_type: "",
    shelf_life_days: "",
    quantity: "",
    unit: "",
    unitprice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient({
      ...ingredient,
      [name]: value,
    });
  };

  const handleAdd = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/seller/add_ingredients`;

      const data = new URLSearchParams();
      data.append("ingredient_name", ingredient.ingredient_name);
      data.append("ingredient_type", ingredient.ingredient_type);
      data.append("ingredient_sub_type", ingredient.ingredient_sub_type);
      data.append("shelf_life_days", ingredient.shelf_life_days);
      data.append("quantity", ingredient.quantity);
      data.append("unit", ingredient.unit);
      data.append("unitprice", ingredient.unitprice);

      const response = await axios.post(apiUrl, data, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("Ingredient Added:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/ingredients/delete`;

      const response = await axios.post(
        apiUrl,
        { name: ingredient.ingredient_name },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Ingredient Deleted:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleUpdateQuantity = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/ingredients/update/quantity`;

      const response = await axios.post(
        apiUrl,
        {
          name: ingredient.ingredient_name,
          quantity: ingredient.quantity,
        },
        {
          headers: {
            accept: "application.json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Ingredient Quantity Updated:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleDisplaySummary = useCallback(async () => {
    try {
      const apiUrl = `${API_BASE_URL}/seller/get_ingredient_summary`;

      const response = await axios.get(apiUrl);

      setSummary(response.data);
      onOpen();
    } catch (error) {
      console.error("API Error:", error);
    }
  }, [onOpen]);

  const ingredientTypes = [
    "Dairy",
    "Nuts",
    "Spices",
    "Fruits",
    "Vegetables",
    "Flour",
    "Condiments",
    "Oil and Dressing",
    "Meat",
    "Chicken",
    "Soy",
    "Fish",
    "Seafood",
    "Other",
  ];

  const unitOptions = ["kg", "g", "l", "ml", "lb", "oz", "tbsp", "tsp"];

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Input
          name="ingredient_name"
          placeholder="Ingredient Name"
          value={ingredient.ingredient_name}
          onChange={handleChange}
        />
        <Select
          name="ingredient_type"
          placeholder="Select Ingredient Type"
          value={ingredient.ingredient_type}
          onChange={handleChange}
        >
          {ingredientTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <Input
          name="ingredient_sub_type"
          placeholder="Ingredient Sub-Type"
          value={ingredient.ingredient_sub_type}
          onChange={handleChange}
        />
        <Input
          name="shelf_life_days"
          placeholder="Shelf Life (Days)"
          type="number"
          value={ingredient.shelf_life_days}
          onChange={handleChange}
        />
        <Input
          name="quantity"
          placeholder="Quantity"
          type="number"
          value={ingredient.quantity}
          onChange={handleChange}
        />
        <Select
          name="unit"
          placeholder="Select Unit"
          value={ingredient.unit}
          onChange={handleChange}
        >
          {unitOptions.map((unit, index) => (
            <option key={index} value={unit}>
              {unit}
            </option>
          ))}
        </Select>
        <Input
          name="unitprice"
          placeholder="Unit Price"
          type="number"
          value={ingredient.unitprice}
          onChange={handleChange}
        />
        <Button colorScheme="teal" onClick={handleAdd}>
          Add Ingredient
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete Ingredient
        </Button>
        <Button colorScheme="teal" onClick={handleUpdateQuantity}>
          Update Quantity
        </Button>
        <Button colorScheme="blue" onClick={handleDisplaySummary}>
          Display Summary
        </Button>
      </VStack>
      <SummaryModal isOpen={isOpen} onClose={onClose} summary={summary} />
    </Box>
  );
}

export default IngredientForm;
