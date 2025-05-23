import mongoose from "mongoose"

const blogPostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["published", "draft", "archived"],
      default: "draft",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

// Add text index for search functionality
blogPostSchema.index({ title: "text", content: "text" })

const BlogPost = mongoose.model("BlogPost", blogPostSchema)

export default BlogPost
