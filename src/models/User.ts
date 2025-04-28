import mongoose, { Schema, model } from 'mongoose';

if (mongoose.models.User) {
  delete mongoose.models.User;
}

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    image: { type: String, default: null },
    emailVerified: { type: Boolean, default: true },
  }
);

const User = model('User', UserSchema);

export default User;