export const fetchApiData = async (category, apiName) => {
  try {
      const response = await fetch('/apiEndpoints.json'); 
      const data = await response.json();

      if (!data[category] || !data[category][apiName]) {
          throw new Error("Invalid API selection");
      }

      const apiConfig = data[category][apiName];
      const url = `https://sky-scrapper.p.rapidapi.com${apiConfig.endpoint}`;
      const params = new URLSearchParams(apiConfig.parameters).toString();
      const fullUrl = `${url}?${params}`;

      const options = {
          method: apiConfig.method,
          headers: {
              'x-rapidapi-key': process.env.REACT_APP_FLIGHT_API_KEY,
              'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
          }
      };

      const apiResponse = await fetch(fullUrl, options);
      const result = await apiResponse.json();
      return result;
  } catch (error) {
      console.error("API Fetch Error:", error);
      return { error: error.message };
  }
};
