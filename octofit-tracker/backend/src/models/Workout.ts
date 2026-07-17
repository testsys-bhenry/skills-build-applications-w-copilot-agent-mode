import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, required: true, min: 1 },
    reps: { type: Number, required: true, min: 1 },
    loadKg: { type: Number, min: 0, default: 0 },
  },
  { _id: false }
);

const workoutSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['strength', 'cardio', 'mobility', 'recovery'],
    },
    exercises: { type: [exerciseSchema], default: [] },
    plannedDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Workout = model('Workout', workoutSchema);

export default Workout;
