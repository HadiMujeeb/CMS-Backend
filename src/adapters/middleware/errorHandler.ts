import { Request, Response, NextFunction } from 'express';
import { IErrorResponse } from '../../domain/error.entity';
import { ErrorMessages } from '../../common/responseMessages/error.message';

// import logError from '../config/logger.config';


export const errorHandler = (err: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode
    const message = err.message || err;
    const key = err.key
    console.error("error",err)
    res.status(statusCode).json({ message,key});
};