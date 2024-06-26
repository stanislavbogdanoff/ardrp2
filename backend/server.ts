const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
const cors = require("cors");
const router = express.Router();
const { errorHandler } = require("./middleware/errorMiddleware.ts");
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
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

app.use("/api/wallets", walletRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", require("./routes/profileRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/discords", require("./routes/discordRoutes"));
app.use("/api/emails", require("./routes/emailRoutes"));
app.use("/api/twitters", require("./routes/twitterRoutes"));

app.listen(port, () => console.log(`Port ${port} is up and running baby`));
