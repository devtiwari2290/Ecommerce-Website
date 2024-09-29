import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// configure .env
dotenv.config();

// connect to db
connectDB();

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Port
const PORT = process.env.PORT || 3001;

// rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to Ecommerce App!</h1>");
});

// Use PORT variable here instead of hardcoded value
app.listen(PORT, () => console.log(`Server running in ${process.env.MODE} mode on port ${PORT}`));
