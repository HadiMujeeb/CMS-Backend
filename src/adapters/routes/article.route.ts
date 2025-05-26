import express,{ Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { ArticleUsecase } from "../../usecases/article.usecase";
import { articleRepository } from "../repositories/mongodb/article.repository";

const ArticleRepositoy = new articleRepository();
const articleUseCase = new ArticleUsecase(ArticleRepositoy);
const articleController = new ArticleController(articleUseCase);

const articleRoute:Router = express.Router();

// Routes
articleRoute.post('/create', articleController.createArticleRequest.bind(articleController));
articleRoute.post('/edit', articleController.editArticleRequest.bind(articleController));
articleRoute.delete('/delete', articleController.deleteArticleRequest.bind(articleController));
articleRoute.get('/getArticles', articleController.getAllArticleRequest.bind(articleController));
articleRoute.get('/getEditArticle', articleController.getEditArticleRequest.bind(articleController));

// Export
export default articleRoute;