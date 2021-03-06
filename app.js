// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require('./middleware/jwt.middleware')

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
app.use("/api", require("./routes/index.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users",isAuthenticated, require("./routes/user.routes"));
app.use("/api/summeries",isAuthenticated, require("./routes/summery.routes"));
app.use("/api/books",isAuthenticated, require("./routes/book.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
