import asyncHandler from "express-async-handler"
import Category from "../models/Category.js"
import BlogPost from "../models/BlogPost.js"

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 })

    // Return the categories array directly
    res.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ message: "Error fetching categories" })
  }
})

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      res.json(category)
    } else {
      res.status(404)
      throw new Error("Category not found")
    }
  } catch (error) {
    console.error("Error fetching category:", error)
    res.status(404).json({ message: "Category not found" })
  }
})

// @desc    Create a category
// @route   POST /api/categories
// @access  Private
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body

    // Validate required fields
    if (!title) {
      res.status(400)
      throw new Error("Title is required")
    }

    const categoryExists = await Category.findOne({ title })

    if (categoryExists) {
      res.status(400)
      throw new Error("Category already exists")
    }

    const category = await Category.create({
      title,
      description: description || "",
    })

    res.status(201).json(category)
  } catch (error) {
    console.error("Error creating category:", error)
    if (error.message === "Category already exists" || error.message === "Title is required") {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: "Error creating category" })
    }
  }
})

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body

    const category = await Category.findById(req.params.id)

    if (category) {
      category.title = title || category.title
      category.description = description !== undefined ? description : category.description

      const updatedCategory = await category.save()
      res.json(updatedCategory)
    } else {
      res.status(404)
      throw new Error("Category not found")
    }
  } catch (error) {
    console.error("Error updating category:", error)
    res.status(404).json({ message: "Category not found" })
  }
})

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)

    if (category) {
      // Check if any blog posts use this category
      const blogPostsWithCategory = await BlogPost.countDocuments({ category: req.params.id })

      if (blogPostsWithCategory > 0) {
        res.status(400)
        throw new Error("Cannot delete category that is used by blog posts")
      }

      await category.deleteOne()
      res.json({ message: "Category removed", id: req.params.id })
    } else {
      res.status(404)
      throw new Error("Category not found")
    }
  } catch (error) {
    console.error("Error deleting category:", error)
    if (error.message === "Cannot delete category that is used by blog posts") {
      res.status(400).json({ message: error.message })
    } else {
      res.status(404).json({ message: "Category not found" })
    }
  }
})

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
