import { Request, Response, NextFunction } from "express";

export interface IArticleController{
  createArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  editArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
  getEditArticleRequest(req: Request, res: Response, next: NextFunction): Promise<void>;
}
