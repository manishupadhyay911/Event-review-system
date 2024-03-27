const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/dbConnection");
const userRoutes = require("./routes/userRoutes");
const organiserRoutes = require("./routes/OrganiserRoutes")
dotenv.config();

connectDB();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/organiser", organiserRoutes);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Running on🚀: ${process.env.PORT}`);
});
