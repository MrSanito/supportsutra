import type { NextFunction, Request, Response } from "express";

const TryCatch = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controller(req, res, next);
  } catch (err: any) {
    console.log("Error in controller:", err);
    if (err && err.name === "ZodError") {
      return res.status(400).json({ error: "Validation error", details: err.flatten() });
    }
    res.status(500).json({ error: "Internal Server Error", message: err.message || String(err) });
  }
};

export default TryCatch;
