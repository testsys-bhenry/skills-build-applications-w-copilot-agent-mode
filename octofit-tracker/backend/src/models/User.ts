import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 13, max: 100 },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
