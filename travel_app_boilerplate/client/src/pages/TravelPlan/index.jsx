import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlightTakeoff,
  LocationCity,
  CalendarToday,
  Place,
  LocalDining,
  Diversity3Rounded,
  Festival,
  Language,
} from "@mui/icons-material";

export default function TravelPlan({ result, placeName, days, error }) {
  console.log(result);
  const actions = [
    { icon: <LocalDining />, name: "Local Cuisine" },
    { icon: <Diversity3Rounded />, name: "Cultural Insights" },
    { icon: <Festival />, name: "Festivals & Events" },
    { icon: <Language />, name: "Language Buddy" },
  ];
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #90caf9 0%, #1976d2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255,255,255,0.85)",
          }}
        >
          <Box textAlign="center" mb={3}>
            <FlightTakeoff sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h4" fontWeight={700}>
              Here's unveiling the Travel Plan to {placeName} for {days} Days.
              The below itinerary is just a preliminary draft. For the fair copy
              click here. You can explore more about the locations, by clicking
              on the place name.
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Plan your trip or learn about cultures in seconds.
            </Typography> */}
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              ❌ {error}
            </Typography>
          )}

          <AnimatePresence>
            {result && result.output && result.output.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Divider sx={{ my: 3 }} />

                <Card
                  sx={{
                    background:
                      "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                    borderRadius: 3,
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="primary.main"
                      gutterBottom
                    >
                      <Place sx={{ verticalAlign: "middle", mr: 1 }} />
                      {placeName}
                    </Typography>

                    {result.number_of_days > 0 && (
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CalendarToday fontSize="small" /> {days} days itinerary
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                {result.output && result.output.length > 0 && (
                  <Box mt={3} display="grid" gap={2}>
                    {result.output.map((day, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                          <CardContent>
                            <Typography
                              variant="h6"
                              fontWeight={700}
                              color="primary.main"
                              gutterBottom
                            >
                              {day["start date"]} to {day["end date"]}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              <Chip
                                icon={<LocationCity />}
                                label={day["place name"]}
                                clickable
                              />
                              {day["place name"] &&
                                day["place name"].indexOf("Travel Day") >=
                                  0 && (
                                  <SpeedDial
                                    ariaLabel="More info"
                                    icon={<SpeedDialIcon />}
                                    direction="right"
                                  >
                                    {actions.map((action) => (
                                      <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        slotProps={{
                                          tooltip: {
                                            title: action.name,
                                          },
                                        }}
                                      />
                                    ))}
                                  </SpeedDial>
                                )}
                            </Typography>
                            {day["sight seeing place"].length > 0 && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {day["sight seeing place"].length
                                  ? day["sight seeing place"].join(",")
                                  : "No places identified"}
                              </Typography>
                            )}
                            {day.transport.length === 0 &&
                              day.hotels &&
                              day.hotels.length > 0 && (
                                <Box mt={3} display="grid" gap={2}>
                                  <Typography
                                    variant="h6"
                                    color="primary.main"
                                    gutterBottom
                                  >
                                    List of Hotels
                                  </Typography>
                                  {day.hotels.map((hotel, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                    >
                                      <Card
                                        variant="outlined"
                                        sx={{ borderRadius: 3 }}
                                      >
                                        <CardContent>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            {hotel["name"]}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            Tariff: {hotel.tariff} per night
                                          </Typography>
                                        </CardContent>
                                      </Card>
                                    </motion.div>
                                  ))}
                                </Box>
                              )}
                            {day.transport && day.transport.length > 0 && (
                              <Box mt={3} display="grid" gap={2}>
                                <Typography
                                  variant="h6"
                                  color="primary.main"
                                  gutterBottom
                                >
                                  Transport Sugesstions
                                </Typography>
                                {day.transport.map((trans, idx) => (
                                  <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                  >
                                    <Card
                                      variant="outlined"
                                      sx={{ borderRadius: 3 }}
                                    >
                                      <CardContent>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Transport Mode: {trans.mode}
                                        </Typography>
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          Transport Tariff: {trans.price}
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                ))}
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </Box>
                )}

                {/* {result.culture && (
                  <Card
                    variant="outlined"
                    sx={{
                      mt: 3,
                      backgroundColor: "#f3f6f9",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        gutterBottom
                      >
                        🌸 Cultural Insights
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {result.culture}
                      </Typography>
                    </CardContent>
                  </Card>
                )} */}
              </motion.div>
            )}
          </AnimatePresence>
        </Paper>
      </Container>
    </Box>
  );
}
