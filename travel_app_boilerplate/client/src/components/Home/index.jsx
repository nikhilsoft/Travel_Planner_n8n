import { use, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TravelPlan from "../../pages/TravelPlan";
import { NumericFormat } from "react-number-format";
import Grid from "@mui/material/Grid";

import { useNavigate } from "react-router-dom";

import "../../styles.css";

export default function App() {
  const [destinationPlace, setDestinationPlace] = useState("");
  const [originPlace, setOriginPlace] = useState("");
  const [days, setDays] = useState(3);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitted, setSubmitted] = useState(false);
  const [budget, setBudget] = useState(500);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    let tempMarks = [];
    for (let count = 1; count <= 15; count++) {
      tempMarks.push({
        value: count,
        label:
          count > 1 ? count.toString() + " days" : count.toString() + " day",
      });
    }
    setMarks(tempMarks);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const res = await fetch("/api/travel-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place_name: destinationPlace,
          number_of_days: Number(days),
          email,
          from_place: originPlace,
          budget,
        }),
      });
      setResult(await res.json());
      setError(null);
    } catch (e) {
      setError(e);
      setResult(null);
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div>
      <h1>Travel Planner</h1>
      <Box component="form" sx={{ p: 2, margin: 0 }} onSubmit={onSubmit}>
        <Grid container spacing={2} direction="row">
          <Grid item xs={12} md={12}>
            <TextField
              variant="standard"
              label="From"
              placeholder="From"
              value={originPlace}
              onChange={(e) => setOriginPlace(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              variant="standard"
              label="To"
              placeholder="To"
              value={destinationPlace}
              onChange={(e) => setDestinationPlace(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <NumericFormat
              value={days}
              onChange={(e) => setDays(e.target.value)}
              customInput={TextField}
              valueIsNumericString
              variant="standard"
              label="No. of Days Stay"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <NumericFormat
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              customInput={TextField}
              thousandSeparator
              valueIsNumericString
              prefix="$"
              variant="standard"
              label="Budget"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              variant="standard"
              label="Email"
              placeholder="abc@yourmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Button
              type="submit"
              variant="outlined"
              loading={isSubmitted}
              loadingPosition="center"
              size="medium"
              sx={{ width: 150 }}
            >
              {isSubmitted ? "Generating Plan..." : "Generate Plan"}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {error && (
        <div>
          <pre>
            We were not able to retrieve your travel plan due to some technical
            problem. Please try later.
          </pre>
        </div>
      )}
      {result && (
        <TravelPlan
          result={result}
          placeName={destinationPlace}
          days={days}
          error={error}
        />
      )}
    </div>
  );
}
