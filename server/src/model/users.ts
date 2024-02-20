import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = model("User", userSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserByUsername = (username: string) =>
  UserModel.findOne({ username });

export const deleteUserByID = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });

export const getUserByID = (id: string) => UserModel.findById(id);

export const updateUserByID = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate({ id, values });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const isAdmin = (id: string) =>
  UserModel.findById(id).then((user) => user && user.isAdmin);
