import type { NextFunction, Request, Response } from "express";

const TryCatch = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default TryCatch;
