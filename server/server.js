import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import blogPostRoutes from "./routes/blogPostRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()

// Routes
app.use("/api/blog-posts", blogPostRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/auth", authRoutes)

// Basic route for testing
app.get("/", (req, res) => {
  res.send("API is running...")
})

// Error handling middleware
app.use(notFound)
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
