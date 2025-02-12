import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const FormScreen = ({ endpoint, setStep, setResponseData, setSelectedCategory }) => {
  const today = new Date().toISOString().split("T")[0]; 
  const defaultData = {
    date: today,
    returnDate: today,
    originSkyId: "LOND",
    destinationSkyId: "NYCA",
    originEntityId: "27544008",
    destinationEntityId: "27537542",
    cabinClass: "economy",
    adults: 1,
    childrens: 0,
    infants: 0,
    sortBy: "best",
    limit: 100,
    currency: "USD",
    market: "en-US",
    countryCode: "US"
  };

  const [formData, setFormData] = useState({ ...defaultData, ...endpoint.parameters });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    const urlParams = new URLSearchParams(formData).toString();
    const url = `https://sky-scrapper.p.rapidapi.com${endpoint.endpoint}?${urlParams}`;

    const options = {
      method: endpoint.method,
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_FLIGHT_API_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setResponseData(data);
      setStep("results");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <Button variant="contained" sx={{ mb: 3 }} onClick={() => setStep("category")}>🔙 Back</Button>
      <Typography variant="h5">{endpoint.endpoint} Parameters</Typography>
      {Object.keys(formData).map((key) => (
        <TextField
          key={key}
          label={key}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          fullWidth
          sx={{ my: 1 }}
        />
      ))}
      <Button variant="contained" color="primary" onClick={fetchData} sx={{ mt: 3 }}>🔍 Search</Button>
    </Box>
  );
};

export default FormScreen;
