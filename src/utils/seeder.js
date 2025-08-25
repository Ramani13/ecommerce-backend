import mongoose from "mongoose";
import dotenv from "dotenv";
import products from "../data/products.js";
import users from "../data/users.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Insert users first
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Attach admin user ID to each product
    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    // Insert products
    await Product.insertMany(sampleProducts);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑️ Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error destroying data:", error);
    process.exit(1);
  }
};

// Command line check
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
