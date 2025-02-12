import React, { useEffect } from "react";
import { Button, Typography, Box, Card, CardContent, Grid } from "@mui/material";

const ResultsScreen = ({ data, setStep }) => {
  useEffect(() => {
    if (data?.status === false) {
      console.warn("⚠️ Warning: API request failed!", JSON.stringify(data, null, 2));
    }
  }, [data]);

  const extractResults = (data) => {
    if (!data || typeof data !== 'object') return [];
    
    let results = [];
    if (Array.isArray(data.data)) {
      results = data.data;
    } else if (typeof data.data === 'object') {
      Object.keys(data.data).forEach((key) => {
        if (Array.isArray(data.data[key])) results.push(...data.data[key]);
        else if (typeof data.data[key] === 'object') results.push(data.data[key]);
      });
    }
    
    return results.length > 5 ? results.slice(0, 5) : results;
  };

  const results = extractResults(data);

  return (
    <Box textAlign="center" mt={5}>
      <Button variant="contained" sx={{ mb: 3 }} onClick={() => setStep("form")}>🔙 Back</Button>
      <Typography variant="h5">✅ API Response</Typography>
      <Grid container spacing={2} justifyContent="center">
        {results.length > 0 ? (
          results.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "left", backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "10px" }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    {item.entityName || item.presentation?.title || item.review?.text || "No Title Available"}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {item.hierarchy || item.presentation?.subtitle || "No Subtitle Available"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Entity ID: {item.entityId || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Location: {item.location || "N/A"}
                  </Typography>
                  {item.review?.text && (
                    <Typography variant="body2" color="textSecondary" mt={1}>
                      Review: {item.review.text}
                    </Typography>
                  )}
                  {item.formatRating && (
                    <Typography variant="body2" color="textSecondary" mt={1}>
                      Rating: {item.formatRating} / 5
                    </Typography>
                  )}
                  {item.partnerLogo && (
                    <Box mt={1}>
                      <img src={item.partnerLogo} alt="Review Partner" style={{ maxWidth: "100px" }} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="error">🚨 No data available! Check console for details.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ResultsScreen;
