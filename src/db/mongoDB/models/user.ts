import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserAttributes extends Document {
  userName: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<UserAttributes> = mongoose.model<UserAttributes>('User', userSchema);

export default User;
