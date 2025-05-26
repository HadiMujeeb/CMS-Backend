import { IArticleRepository } from "../../../interfaces/repositories/Iarticle.repository";
import articleModel from "../../../infrastructure/database/mongo/article.model";
import { IArticle } from "../../../domain/article.entity";
export class articleRepository implements IArticleRepository {

    async createArticle(title: string, content: string, authorName: string, authorId?: string): Promise<IArticle> {
    try {
      const newArticle = await articleModel.create({
        title,
        content,
        authorName,
        authorId,
        isPublished: true
      });
      return newArticle.toObject();
    } catch (error) {
      throw error
    }
  }

async editArticle(id: string, title: string, content: string, authorName: string): Promise<IArticle | null> {
  try {
    const article = await articleModel.findByIdAndUpdate(
      id,
      { title, content, authorName },
      { new: true }
    );

    return article ? article.toObject() : null;
  } catch (error) {
    throw error
  }
}


    async deletArticle(id: string): Promise<void> {
    try {
      const result = await articleModel.findByIdAndDelete(id);
    } catch (error) {
      throw error
    }
  }
   async getAllArticle(): Promise<IArticle[]> {
    try {
      const articles = await articleModel.find();
      return articles.map(article => article.toObject());
    } catch (error) {
      throw error
    }
  }

  async findArticleById(id: string): Promise<IArticle | null> {
    try {
      const article = await articleModel.findById(id);
      return article ? article.toObject() : null;
    } catch (error) {
      throw error
    }
  }
}
