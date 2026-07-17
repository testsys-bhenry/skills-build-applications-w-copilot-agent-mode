"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const baseUrl_1 = require("../config/baseUrl");
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const apiRouter = (0, express_1.Router)();
apiRouter.get('/health', (_req, res) => {
    res.json({
        status: 'ok',
        port: 8000,
        mongo: database_1.default.readyState,
        apiBaseUrl: baseUrl_1.apiBaseUrl,
    });
});
apiRouter.get('/users/', async (_req, res) => {
    const items = await User_1.default.find({}).lean();
    res.json({ count: items.length, items, resource: 'users', apiBaseUrl: baseUrl_1.apiBaseUrl });
});
apiRouter.get('/teams/', async (_req, res) => {
    const items = await Team_1.default.find({}).lean();
    res.json({ count: items.length, items, resource: 'teams', apiBaseUrl: baseUrl_1.apiBaseUrl });
});
apiRouter.get('/activities/', async (_req, res) => {
    const items = await Activity_1.default.find({}).sort({ completedAt: -1 }).lean();
    res.json({ count: items.length, items, resource: 'activities', apiBaseUrl: baseUrl_1.apiBaseUrl });
});
apiRouter.get('/leaderboard/', async (_req, res) => {
    const items = await Leaderboard_1.default.find({}).sort({ rank: 1 }).lean();
    res.json({ count: items.length, items, resource: 'leaderboard', apiBaseUrl: baseUrl_1.apiBaseUrl });
});
apiRouter.get('/workouts/', async (_req, res) => {
    const items = await Workout_1.default.find({}).sort({ plannedDate: 1 }).lean();
    res.json({ count: items.length, items, resource: 'workouts', apiBaseUrl: baseUrl_1.apiBaseUrl });
});
exports.default = apiRouter;
