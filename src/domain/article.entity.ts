import mongoose from "mongoose";

export interface IArticle {
  _id?: string;
  title: string;
  content: string;
  authorId?: string
  authorName:string;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}