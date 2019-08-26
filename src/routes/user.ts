import express from "express";
import { check, body } from "express-validator";
import { getUser, deleteUser, addUser } from "../controllers/userController";
import validateResults from "../serializers/validation";

const userRouter = express.Router();

userRouter.get(
  "/users/:uuid",
  check("uuid")
    .isUUID(4)
    .not()
    .isEmpty(),
  validateResults,
  getUser
);

userRouter.delete(
  "/users/:uuid",
  check("uuid")
    .isUUID(4)
    .not()
    .isEmpty(),
  validateResults,
  deleteUser
);

userRouter.post(
  "/users/",
  [
    body("login")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Login must not be empty"),
    body("firstName")
      .isString()
      .not()
      .isEmpty()
      .withMessage("First name must not be empty"),
    body("lastName")
      .isString()
      .not()
      .isEmpty()
      .withMessage("Last name must not be empty"),
    body("email")
      .isEmail()
      .withMessage("Not a valid email address")
      .not()
      .isEmpty()
      .withMessage("Email must not be empty")
      .normalizeEmail({ all_lowercase: true }),
    body("password")
      .isLength({ min: 8 }).withMessage('Must be at least 8 chars long')
      .matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
      .withMessage("You need to have at least one lowercase letter one uppercase letter and a number")
  ],
  validateResults,
  addUser
);

export default userRouter;
