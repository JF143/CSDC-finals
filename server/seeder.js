import dotenv from "dotenv"
import User from "./models/User.js"
import BlogPost from "./models/BlogPost.js"
import Category from "./models/Category.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // Clear existing data
    await BlogPost.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()

    // Create admin user
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "password123",
      picture: "https://ui-avatars.com/api/?name=Admin+User",
    })

    // Create categories
    const categories = await Category.insertMany([
      {
        title: "Technology",
        description: "Articles about the latest tech trends",
      },
      {
        title: "Design",
        description: "UI/UX and graphic design articles",
      },
      {
        title: "Development",
        description: "Web and software development articles",
      },
    ])

    // Create sample blog posts
    const sampleBlogPosts = [
      {
        title: "Getting Started with React",
        content: "React is a JavaScript library for building user interfaces...",
        status: "published",
        category: categories[2]._id,
        author: adminUser._id,
        tags: ["react", "javascript", "frontend"],
      },
      {
        title: "UI Design Principles",
        content: "Good UI design follows certain principles...",
        status: "published",
        category: categories[1]._id,
        author: adminUser._id,
        tags: ["design", "ui", "principles"],
      },
      {
        title: "The Future of AI",
        content: "Artificial Intelligence is rapidly evolving...",
        status: "published",
        category: categories[0]._id,
        author: adminUser._id,
        tags: ["ai", "technology", "future"],
      },
    ]

    await BlogPost.insertMany(sampleBlogPosts)

    console.log("Data Imported!".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await BlogPost.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()

    console.log("Data Destroyed!".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === "-d") {
  destroyData()
} else {
  importData()
}
