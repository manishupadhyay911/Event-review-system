const express = require("express");
const app = express();
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const ratingRoutes = require("./routes/ratingRoutes")
const dotenv = require("dotenv");
const connectDB = require("./Config/dbConnection");
dotenv.config();

connectDB();
app.use(express.json());
app.use("/api/event", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/rating", ratingRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running on🚀: ${process.env.PORT}`);
});
