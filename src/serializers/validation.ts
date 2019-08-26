import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { UnprocessableEntityHttpSerializer } from "./httpSerializer";

const validateResults = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return new UnprocessableEntityHttpSerializer(res).serialize(
      errors.array({ onlyFirstError: true })
    );
  }
  return next();
};

export default validateResults;
