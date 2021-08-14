import mongoose from "mongoose";

interface FollowerAttrs {
  follower: string;
  following: string;
}

interface FollowerDocument extends mongoose.Document {
  follower: string;
  following: string;
  status: FOLLOW_STATUS;
}

interface FollowerModel extends mongoose.Model<FollowerDocument> {
  build(attrs: FollowerAttrs): FollowerDocument;
}

enum FOLLOW_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

const followerSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: Object.values(FOLLOW_STATUS),
    default: FOLLOW_STATUS.PENDING,
  },
});

followerSchema.statics.build = function (attrs: FollowerAttrs) {
  return new Follower(attrs);
};

const Follower = mongoose.model<FollowerDocument, FollowerModel>(
  "Follower",
  // @ts-ignore
  followerSchema
);

export default Follower;
