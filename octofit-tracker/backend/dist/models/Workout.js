"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const exerciseSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    sets: { type: Number, required: true, min: 1 },
    reps: { type: Number, required: true, min: 1 },
    loadKg: { type: Number, min: 0, default: 0 },
}, { _id: false });
const workoutSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['strength', 'cardio', 'mobility', 'recovery'],
    },
    exercises: { type: [exerciseSchema], default: [] },
    plannedDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
const Workout = (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
