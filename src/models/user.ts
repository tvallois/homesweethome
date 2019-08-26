import { Schema, model } from "mongoose";
import { v4 } from "uuid";

const userSchema = new Schema({
  uuid: { type: String, default: v4, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = model("User", userSchema);

export default User;
