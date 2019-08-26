import { Request, Response } from "express";
import User from "../models/user";
import {
  SuccessHttpSerializer,
  NotFoundHttpSerializer,
  BadRequestHttpSerializer
} from "../serializers/httpSerializer";
import { MongoError } from "mongodb";
import { getDuplicateKeyValueFromMongoError } from "../db/error";

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params = req.params as { uuid: string };
  const user = await User.findOne({ uuid: params.uuid }, { _id: 0, __v: 0 });
  if (!user) {
    return new NotFoundHttpSerializer(res).serialize(
      `User ${params.uuid} does not exist`
    );
  }
  return new SuccessHttpSerializer(res).serialize(user);
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params = req.params as { uuid: string };
  const deleteCount = await User.deleteOne({ uuid: params.uuid });
  if (!deleteCount.n || !deleteCount.ok) {
    return new NotFoundHttpSerializer(res).serialize(
      `User ${params.uuid} does not exist`
    );
  }
  return new SuccessHttpSerializer(res).serialize(
    `${deleteCount.n} value(s) have been deleted`
  );
};

export const addUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const createdUser = await new User(req.body).save();
    return new SuccessHttpSerializer(res).serialize(createdUser);
  } catch (err) {
    if (err instanceof MongoError && err.code === 11000) {
      const [field, value] = getDuplicateKeyValueFromMongoError(err);
      return new BadRequestHttpSerializer(res).serialize(
        `The ${field} ${value} already exist.`
      );
    }
    return new BadRequestHttpSerializer(res).serialize(
      "Impossible to create the user"
    );
  }
};
