# Google Flights Clone - Technical Documentation ✈️

## Overview
This project is a **Google Flights Clone** built using **React**, with flight, hotel, and car rental data fetched from the **Sky-Scrapper API** (RapidAPI). The goal was to create a structured and scalable architecture that ensures maintainability and efficiency when handling multiple APIs.

## Architectural Approach 🏗️
### 1️⃣ **Dynamic API Management with `apiEndpoints.json`**
Instead of hardcoding API endpoints inside multiple components, I centralized all API configurations in `apiEndpoints.json`. This approach ensures:
- **Flexibility**: If the API structure changes, only `apiEndpoints.json` needs to be updated.
- **Scalability**: Easily add new endpoints without modifying component logic.
- **Maintainability**: Reduces redundancy and improves readability.

Example `apiEndpoints.json` entry:
```json
{
  "flights": {
    "searchFlights": {
      "endpoint": "/api/v1/flights/searchFlights",
      "method": "GET",
      "parameters": {
        "originSkyId": "LOND",
        "destinationSkyId": "NYCA",
        "date": "2025-03-01"
      },
      "required": ["originSkyId", "destinationSkyId", "date"]
    }
  }
}
```

### 2️⃣ **Reusable API Service (`api.js`)**
A generic API handler is used to fetch data from various endpoints dynamically:
```javascript
const fetchData = async (endpoint, params = {}) => {
  try {
    const url = `https://sky-scrapper.p.rapidapi.com${endpoint}`;
    const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_FLIGHT_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_FLIGHT_API_HOST
      }
    });
    return await response.json();
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { status: false, message: "API error occurred" };
  }
};
```
This ensures:
- **Reusability**: Any component can call `fetchData(endpoint, params)` without handling request logic.
- **Consistency**: Centralized error handling.
- **Security**: API keys remain protected in `.env`.

### 3️⃣ **Component-Based UI Design**
Each major section of the UI is modularized:
- `HomeScreen.js` → Displays available categories (Flights, Hotels, Cars)
- `CategoryScreen.js` → Lists all API endpoints for a selected category
- `FormScreen.js` → Dynamically generates input fields based on API parameters
- `ResultsScreen.js` → Displays fetched results in a structured UI

### 4️⃣ **Handling Dynamic API Responses in `ResultsScreen.js`**
The `ResultsScreen.js` component extracts data dynamically, ensuring it works across flights, hotels, and car rentals:
```javascript
const extractResults = (data) => {
  if (!data || typeof data !== 'object') return [];
  let results = [];
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) results.push(...data[key]);
    else if (typeof data[key] === 'object') results.push(data[key]);
  });
  return results.slice(0, 5); // Display only first 5 results for clarity
};
```
This prevents hardcoding specific response structures and allows dynamic data extraction.

### 5️⃣ **Displaying Hotel Reviews Correctly**
Previously, hotel reviews lacked titles. The updated approach ensures correct rendering:
```javascript
<Typography variant="h6" color="primary">
  {item.review?.text || item.entityName || "No Title Available"}
</Typography>
```
This prioritizes `review.text` (the actual review) over missing `title` fields.

---

## Deployment & Setup 🛠️
### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/Dara4hem/Google-Flights.git
cd Google-Flights
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env` file:
```plaintext
REACT_APP_FLIGHT_API_KEY=d915e884e3msh5db8d65483afb9dp17cde1jsn48277cb2c40c
REACT_APP_FLIGHT_API_HOST=sky-scrapper.p.rapidapi.com
```

### 4️⃣ **Run the Application**
```bash
npm start
```

---

## Conclusion ✅
This project was designed with a focus on:
- **Scalability** by avoiding hardcoded API configurations
- **Maintainability** with reusable API handling
- **Performance Optimization** by limiting displayed results

If extended, future improvements could include:
- **Sorting & Filtering Enhancements**
- **Integration with Payment Gateways**
- **User Authentication & Bookings**

This structured approach ensures a clean, professional, and extendable architecture. 🚀

