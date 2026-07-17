import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: ['run', 'cycle', 'swim', 'strength', 'yoga', 'row'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 1 },
    completedAt: { type: Date, required: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const Activity = model('Activity', activitySchema);

export default Activity;
