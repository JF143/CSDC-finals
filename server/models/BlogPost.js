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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // Make author optional for now
      required: false,
    },
    status: {
      type: String,
      enum: ["draft", "published", "rejected"],
      default: "draft",
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

const BlogPost = mongoose.model("BlogPost", blogPostSchema)

export default BlogPost
