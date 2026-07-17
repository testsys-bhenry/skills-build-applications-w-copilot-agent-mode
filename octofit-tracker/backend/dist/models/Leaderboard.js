"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    period: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'weekly',
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });
const Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
