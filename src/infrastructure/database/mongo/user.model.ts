import mongoose,{Schema,model} from "mongoose";
import { IUser } from "../../../domain/user.entity";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "",
    },
    isVerifyed: {
      type: Boolean,
      default: false,
    },
    otp: {
      code: {
        type: String,
        default: null,
      },
      expires: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);


export default mongoose.model<IUser>("User",userSchema);