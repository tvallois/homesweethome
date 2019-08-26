import { Response } from "express";
import { ValidationError } from "express-validator";

abstract class HttpSerializer {
  public res: Response;
  constructor(res: Response) {
    this.res = res;
  }
  abstract serialize(data: any): Response;
}

export class SuccessHttpSerializer extends HttpSerializer {
  serialize(data: any): Response {
    return this.res.status(200).json({ status: "Success", data });
  }
}

export class NotFoundHttpSerializer extends HttpSerializer {
  serialize(data: string): Response {
    return this.res.status(404).json({ status: "Not Found", data });
  }
}

export class BadRequestHttpSerializer extends HttpSerializer {
  serialize(data: string): Response {
    return this.res.status(400).json({ status: "Bad Request", data });
  }
}

export class UnprocessableEntityHttpSerializer extends HttpSerializer {
  serialize(data: ValidationError[]): Response {
    return this.res.status(422).json({ status: "Unprocessable Entity", data});
  }
}
