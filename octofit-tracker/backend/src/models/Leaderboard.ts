import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: {
      type: String,
      required: true,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'weekly',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
