import React, { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import CategoryScreen from "./components/CategoryScreen";
import FormScreen from "./components/FormScreen";
import ResultsScreen from "./components/ResultsScreen";
import apiEndpoints from "./apiEndpoints.json";
import { Container } from "@mui/material";

function App() {
  const [step, setStep] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [responseData, setResponseData] = useState(null);

  return (
    <Container>
      {step === "home" && <HomeScreen setStep={setStep} setSelectedCategory={setSelectedCategory} />}
      {step === "category" && (
        <CategoryScreen category={selectedCategory} setStep={setStep} setSelectedEndpoint={setSelectedEndpoint} />
      )}
      {step === "form" && (
        <FormScreen
          endpoint={selectedEndpoint}
          setStep={setStep}
          setResponseData={setResponseData}
        />
      )}
      {step === "results" && <ResultsScreen data={responseData} setStep={setStep} />}
    </Container>
  );
}

export default App;
