const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const cors = require("cors");
const router = express.Router();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const walletRoutes = require("./routes/walletRoutes");
const userRoutes = require("./routes/userRoutes");

// connecting to MongoDB
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.use("/api/wallets", walletRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Port ${port} is up and running baby`));
