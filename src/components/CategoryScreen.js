import React from "react";
import { Button, Typography, Box } from "@mui/material";
import apiEndpoints from "../apiEndpoints.json";

const CategoryScreen = ({ category, setStep, setSelectedEndpoint }) => {
  const endpoints = apiEndpoints[category] || {}; 

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" gutterBottom>📌 {category.toUpperCase()} APIs</Typography>
      {Object.keys(endpoints).length > 0 ? (
        Object.keys(endpoints).map((endpoint) => (
          <Button
            key={endpoint}
            variant="outlined"
            sx={{ m: 2 }}
            onClick={() => {
              setSelectedEndpoint(endpoints[endpoint]);
              setStep("form");
            }}
          >
            {endpoint}
          </Button>
        ))
      ) : (
        <Typography variant="h6" color="error">🚨 No APIs found for this category!</Typography>
      )}
      <Button variant="contained" sx={{ mt: 3 }} onClick={() => setStep("home")}>🔙 Back</Button>
    </Box>
  );
};

export default CategoryScreen;
