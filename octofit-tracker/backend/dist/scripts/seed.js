"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Team_1 = __importDefault(require("../models/Team"));
const User_1 = __importDefault(require("../models/User"));
const Workout_1 = __importDefault(require("../models/Workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            User_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        const teams = await Team_1.default.insertMany([
            { name: 'Summit Striders', city: 'Seattle', coach: 'Ava Thompson' },
            { name: 'Metro Lifters', city: 'Chicago', coach: 'Noah Patel' },
            { name: 'Bay Cardio Crew', city: 'San Francisco', coach: 'Mia Chen' },
        ]);
        const users = await User_1.default.insertMany([
            {
                username: 'jordan87',
                fullName: 'Jordan Rivera',
                email: 'jordan.rivera@example.com',
                age: 31,
                fitnessLevel: 'intermediate',
                teamId: teams[0]._id,
            },
            {
                username: 'samyoung',
                fullName: 'Sam Young',
                email: 'sam.young@example.com',
                age: 27,
                fitnessLevel: 'advanced',
                teamId: teams[1]._id,
            },
            {
                username: 'leila.fit',
                fullName: 'Leila Hassan',
                email: 'leila.hassan@example.com',
                age: 35,
                fitnessLevel: 'intermediate',
                teamId: teams[2]._id,
            },
            {
                username: 'marco.moves',
                fullName: 'Marco Alvarez',
                email: 'marco.alvarez@example.com',
                age: 29,
                fitnessLevel: 'beginner',
                teamId: teams[0]._id,
            },
        ]);
        await Team_1.default.findByIdAndUpdate(teams[0]._id, {
            $set: { members: [users[0]._id, users[3]._id] },
        });
        await Team_1.default.findByIdAndUpdate(teams[1]._id, {
            $set: { members: [users[1]._id] },
        });
        await Team_1.default.findByIdAndUpdate(teams[2]._id, {
            $set: { members: [users[2]._id] },
        });
        const now = new Date();
        await Activity_1.default.insertMany([
            {
                userId: users[0]._id,
                type: 'run',
                durationMinutes: 42,
                caloriesBurned: 480,
                completedAt: new Date(now.getTime() - 86400000),
                notes: 'Tempo run along the waterfront.',
            },
            {
                userId: users[1]._id,
                type: 'strength',
                durationMinutes: 55,
                caloriesBurned: 520,
                completedAt: new Date(now.getTime() - 43200000),
                notes: 'Upper body push and pull session.',
            },
            {
                userId: users[2]._id,
                type: 'cycle',
                durationMinutes: 60,
                caloriesBurned: 610,
                completedAt: new Date(now.getTime() - 21600000),
                notes: 'Hilly route with interval sprints.',
            },
            {
                userId: users[3]._id,
                type: 'yoga',
                durationMinutes: 35,
                caloriesBurned: 170,
                completedAt: new Date(now.getTime() - 10800000),
                notes: 'Mobility and recovery flow.',
            },
        ]);
        await Workout_1.default.insertMany([
            {
                userId: users[0]._id,
                title: 'Leg Power Builder',
                category: 'strength',
                exercises: [
                    { name: 'Back Squat', sets: 4, reps: 6, loadKg: 95 },
                    { name: 'Romanian Deadlift', sets: 3, reps: 8, loadKg: 70 },
                ],
                plannedDate: new Date(now.getTime() + 86400000),
                completed: false,
            },
            {
                userId: users[1]._id,
                title: 'Threshold Intervals',
                category: 'cardio',
                exercises: [
                    { name: 'Bike Intervals', sets: 6, reps: 4, loadKg: 0 },
                    { name: 'Cool Down Row', sets: 1, reps: 12, loadKg: 0 },
                ],
                plannedDate: new Date(now.getTime() + 172800000),
                completed: false,
            },
            {
                userId: users[2]._id,
                title: 'Core and Mobility',
                category: 'mobility',
                exercises: [
                    { name: 'Dead Bug', sets: 3, reps: 12, loadKg: 0 },
                    { name: 'Hip Openers', sets: 3, reps: 10, loadKg: 0 },
                ],
                plannedDate: new Date(now.getTime() + 259200000),
                completed: false,
            },
        ]);
        await Leaderboard_1.default.insertMany([
            {
                period: 'weekly',
                userId: users[2]._id,
                teamId: teams[2]._id,
                points: 980,
                rank: 1,
            },
            {
                period: 'weekly',
                userId: users[1]._id,
                teamId: teams[1]._id,
                points: 910,
                rank: 2,
            },
            {
                period: 'weekly',
                userId: users[0]._id,
                teamId: teams[0]._id,
                points: 860,
                rank: 3,
            },
            {
                period: 'weekly',
                userId: users[3]._id,
                teamId: teams[0]._id,
                points: 640,
                rank: 4,
            },
        ]);
        console.log('Database seeding complete');
        console.log('Created users, teams, activities, leaderboard, and workouts collections.');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
