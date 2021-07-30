import mongoose from "mongoose";

interface UserAttrs {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserDocument extends mongoose.Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

userSchema.statics.build = function (attrs: UserAttrs): UserDocument {
  return new User(attrs);
};

// @ts-ignore
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
