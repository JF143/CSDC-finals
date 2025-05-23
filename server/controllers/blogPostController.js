import asyncHandler from "express-async-handler"
import BlogPost from "../models/BlogPost.js"

// @desc    Get all blog posts
// @route   GET /api/blog-posts
// @access  Public
const getBlogPosts = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10
    const page = Number(req.query.page) || 1

    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { content: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {}

    const categoryFilter = req.query.category ? { category: req.query.category } : {}
    const statusFilter = req.query.status ? { status: req.query.status } : {}

    const count = await BlogPost.countDocuments({
      ...keyword,
      ...categoryFilter,
      ...statusFilter,
    })

    const blogPosts = await BlogPost.find({
      ...keyword,
      ...categoryFilter,
      ...statusFilter,
    })
      .populate("category", "title")
      .populate("author", "name email picture")
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 })

    res.json({
      blogPosts,
      page,
      pages: Math.ceil(count / pageSize),
      total: count,
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    res.status(500).json({ message: "Error fetching blog posts" })
  }
})

// @desc    Get blog post by ID
// @route   GET /api/blog-posts/:id
// @access  Public
const getBlogPostById = asyncHandler(async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)
      .populate("category", "title description")
      .populate("author", "name email picture")

    if (blogPost) {
      res.json(blogPost)
    } else {
      res.status(404)
      throw new Error("Blog post not found")
    }
  } catch (error) {
    console.error("Error fetching blog post:", error)
    res.status(404).json({ message: "Blog post not found" })
  }
})

// @desc    Create a blog post
// @route   POST /api/blog-posts
// @access  Private
const createBlogPost = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, status, tags, image } = req.body

    // Validate required fields
    if (!title || !content || !category) {
      res.status(400)
      throw new Error("Title, content, and category are required")
    }

    const blogPost = new BlogPost({
      title,
      content,
      category,
      status: status || "draft",
      author: req.user._id,
      tags: tags || [],
      image: image || "",
    })

    const createdBlogPost = await blogPost.save()

    // Populate the created blog post before returning
    const populatedBlogPost = await BlogPost.findById(createdBlogPost._id)
      .populate("category", "title")
      .populate("author", "name email picture")

    res.status(201).json(populatedBlogPost)
  } catch (error) {
    console.error("Error creating blog post:", error)
    if (error.message === "Title, content, and category are required") {
      res.status(400).json({ message: error.message })
    } else {
      res.status(500).json({ message: "Error creating blog post" })
    }
  }
})

// @desc    Update a blog post
// @route   PUT /api/blog-posts/:id
// @access  Private
const updateBlogPost = asyncHandler(async (req, res) => {
  try {
    const { title, content, category, status, tags, image } = req.body

    const blogPost = await BlogPost.findById(req.params.id)

    if (blogPost) {
      // Check if user is the author of the post
      if (blogPost.author.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error("You can only edit your own posts")
      }

      blogPost.title = title || blogPost.title
      blogPost.content = content || blogPost.content
      blogPost.category = category || blogPost.category
      blogPost.status = status || blogPost.status
      blogPost.tags = tags || blogPost.tags
      blogPost.image = image || blogPost.image

      const updatedBlogPost = await blogPost.save()

      // Populate the updated blog post before returning
      const populatedBlogPost = await BlogPost.findById(updatedBlogPost._id)
        .populate("category", "title")
        .populate("author", "name email picture")

      res.json(populatedBlogPost)
    } else {
      res.status(404)
      throw new Error("Blog post not found")
    }
  } catch (error) {
    console.error("Error updating blog post:", error)
    if (error.message === "You can only edit your own posts") {
      res.status(403).json({ message: error.message })
    } else {
      res.status(404).json({ message: "Blog post not found" })
    }
  }
})

// @desc    Delete a blog post
// @route   DELETE /api/blog-posts/:id
// @access  Private
const deleteBlogPost = asyncHandler(async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id)

    if (blogPost) {
      // Check if user is the author of the post
      if (blogPost.author.toString() !== req.user._id.toString()) {
        res.status(403)
        throw new Error("You can only delete your own posts")
      }

      await blogPost.deleteOne()
      res.json({ message: "Blog post removed", id: req.params.id })
    } else {
      res.status(404)
      throw new Error("Blog post not found")
    }
  } catch (error) {
    console.error("Error deleting blog post:", error)
    if (error.message === "You can only delete your own posts") {
      res.status(403).json({ message: error.message })
    } else {
      res.status(404).json({ message: "Blog post not found" })
    }
  }
})

export { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost }
