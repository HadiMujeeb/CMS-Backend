import { Request, Response, NextFunction } from "express";
import { IArticleController } from "../../interfaces/controllers/Iarticle.controller";
import { IArticleUseCase } from "../../interfaces/usecases/Iarticle.usecase";
import { HttpStatus } from "../../common/enums/http.status.code";
import { SuccessMessages } from "../../common/responseMessages/success.message";
import { ErrorMessages } from "../../common/responseMessages/error.message";

export class ArticleController implements IArticleController {
  private articleUsecase: IArticleUseCase;

  constructor(articleUsecase: IArticleUseCase) {
    this.articleUsecase = articleUsecase;
  }

  async createArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, content, authorName, authorId } = req.body;
      const article = await this.articleUsecase.createArticle(title, content, authorName, authorId);
      res.status(HttpStatus.CREATED).json({ message: SuccessMessages.create, article: article });
    } catch (error) {
      next(error);
    }
  }

  async editArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { _id,title, content, author } = req.body;
      const updatedArticle = await this.articleUsecase.editArticle(_id, title, content, author);

      if (!updatedArticle) {
        res.status(HttpStatus.NOT_FOUND).json({ message: ErrorMessages.notFound });
        return;
      }

      res.status(HttpStatus.OK).json({ message: SuccessMessages.update, article: updatedArticle });
    } catch (error) {
      next(error);
    }
  }

  async deleteArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id  } = req.query;
      console.log(id,"working")
      await this.articleUsecase.deletArticle(id as string);
      res.status(HttpStatus.OK).json({ message: SuccessMessages.update,id });
    } catch (error) {
      next(error);
    }
  }

  async getAllArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const articles = await this.articleUsecase.getAllArticle();
      res.status(HttpStatus.OK).json({ message: SuccessMessages.retrieve, articles });
    } catch (error) {
      next(error);
    }
  }

  async getEditArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id  } = req.query;
      const article = await this.articleUsecase.getEditArticle(id as string);
      res.status(HttpStatus.OK).json({ message: SuccessMessages.retrieve, article });
    } catch (error) {
      next(error)
    }
  }
}
