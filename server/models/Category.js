import mongoose from "mongoose"

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

const Category = mongoose.model("Category", categorySchema)

export default Category
