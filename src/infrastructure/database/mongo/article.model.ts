import mongoose, { Schema } from "mongoose";
import { IArticle } from "../../../domain/article.entity";

const articleSchema: Schema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId, // assuming author is a user ID
      ref: "User",
      required: true,
    },
    authorName: {
      type:String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IArticle>("Article", articleSchema);
