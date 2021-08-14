import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // @ts-ignore
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// @ts-ignore
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
