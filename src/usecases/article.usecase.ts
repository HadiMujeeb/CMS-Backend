
import { IArticleUseCase } from "../interfaces/usecases/Iarticle.usecase";
import { IArticleRepository } from "../interfaces/repositories/Iarticle.repository";
import { IArticle } from "../domain/article.entity";
import { HttpStatus } from "../common/enums/http.status.code";
import { ErrorMessages } from "../common/responseMessages/error.message";

export class ArticleUsecase implements IArticleUseCase {
  private articleRepository: IArticleRepository;

  constructor(articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository;
  }

  async createArticle(title: string, content: string, authorName: string, authorId: string): Promise<IArticle> {
    try {
      return await this.articleRepository.createArticle(title, content, authorName, authorId);
    } catch (error) {
      throw error
    }
  }

  async editArticle(id:string,title: string, content: string, authorName: string): Promise<IArticle | null> {
    try {
        const isArticle = await this.articleRepository.findArticleById(id)
        if(!isArticle) throw {statusCode:HttpStatus.NOT_FOUND,key:"notFound",message:ErrorMessages.notFound};
      return await this.articleRepository.editArticle(id,title, content, authorName);
    } catch (error) {
      throw error
    }
  }

  async deletArticle(id: string): Promise<void> {
    try {
    const isArticle = await this.articleRepository.findArticleById(id)
    if(!isArticle) throw {statusCode:HttpStatus.NOT_FOUND,key:"notFound",message:ErrorMessages.notFound};
      await this.articleRepository.deletArticle(id);
    } catch (error) {
      throw new Error(`Usecase - Failed to delete article: ${error}`);
    }
  }

  async getAllArticle(): Promise<IArticle[]> {
    try {
      return await this.articleRepository.getAllArticle();
    } catch (error) {
      throw error;
    }
  }

  async getEditArticle(id: string): Promise<IArticle> {
    try {
    const isArticle = await this.articleRepository.findArticleById(id)
    if(!isArticle) throw {statusCode:HttpStatus.NOT_FOUND,key:"notFound",message:ErrorMessages.notFound};
     return isArticle
    } catch (error) {
      throw error
    }
  }
}
