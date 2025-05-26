import { IArticle } from "../../domain/article.entity";

export interface IArticleRepository {
  createArticle(title: string, content: string, authorName: string, authorId?: string): Promise<IArticle>;
  editArticle(id:string,title: string, content: string, authorName: string): Promise<IArticle|null>;
  deletArticle(id:string): Promise<void>;
  getAllArticle():Promise<IArticle[]>;
  findArticleById(id:string):Promise<IArticle|null>;
}