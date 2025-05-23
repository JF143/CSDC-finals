import express from "express"
import {
  getBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogPostController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/").get(getBlogPosts).post(protect, createBlogPost)

router.route("/:id").get(getBlogPostById).put(protect, updateBlogPost).delete(protect, deleteBlogPost)

export default router
