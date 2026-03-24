import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number; 
      userEmail?: string;

      file?: Multer.File;
    }
  }
}