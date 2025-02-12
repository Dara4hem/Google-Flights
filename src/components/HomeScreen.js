import React from "react";
import { Button, Typography, Box } from "@mui/material";

const HomeScreen = ({ setStep, setSelectedCategory }) => {
  const categories = ["Flights", "Hotels", "Car Hire"];

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>🚀 Welcome to Travel API Explorer</Typography>
      <Typography variant="h6" color="textSecondary">Select a category to get started</Typography>
      {categories.map((category) => (
        <Button
          key={category}
          variant="contained"
          color="primary"
          sx={{ m: 2 }}
          onClick={() => {
            setSelectedCategory(category.toLowerCase());
            setStep("category");
          }}
        >
          {category}
        </Button>
      ))}
    </Box>
  );
};

export default HomeScreen;
