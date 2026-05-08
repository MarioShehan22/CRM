const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const salespersonRoutes = require("./routes/salespersonRoutes");
const leadSourceRoutes = require("./routes/leadSourceRoutes");
const leadStatusRoutes = require("./routes/leadStatusRoutes");

const app = express();

app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'CRM Backend Running Successfully'
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/salespersons", salespersonRoutes);
app.use("/api/lead-sources", leadSourceRoutes);
app.use("/api/lead-statuses", leadStatusRoutes);

app.use((req, res, next) => {
  next(createError(404, 'Route Not Found'));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  });
});

module.exports = app;