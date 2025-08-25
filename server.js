import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/product.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { notFound, errorHandler } from "./src/middleware/error.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup for both local + deployed frontend
const allowedOrigins = [
  "http://localhost:3000",              // local frontend
  "https://ecommerce-frontend-tau-mocha.vercel.app",   // 🔴 replace with your real frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
