require("dotenv").config();
const express = require("express");
const { connectDataBase } = require("./config/dbConnectionManager");
const { cors } = require("./middleware/cors");
const app = express();
const { sanitizeQuery } = require("./middleware/sanitizeQuery");
const { logRequest } = require("./middleware/logRequest");

// Connect Database
connectDataBase();

// Init Middleware
app.use(sanitizeQuery);
app.use(logRequest);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors);

// Init Schedules

// Define Routes
app.use("/api/v1", require("./routes/api/search"));
app.use("/api/v1/auth", require("./routes/api/auth"));
app.use("/api/v1/user", require("./routes/api/user"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
