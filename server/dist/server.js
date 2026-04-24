"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("@/middleware/errorHandler");
// Routes
const candidates_1 = __importDefault(require("@/routes/candidates"));
const constituencies_1 = __importDefault(require("@/routes/constituencies"));
const manifesto_1 = __importDefault(require("@/routes/manifesto"));
const match_1 = __importDefault(require("@/routes/match"));
const ai_1 = __importDefault(require("@/routes/ai"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express_1.default.json());
// Routes
app.use('/api/v1/candidates', candidates_1.default);
app.use('/api/v1/constituencies', constituencies_1.default);
app.use('/api/v1/manifesto', manifesto_1.default);
app.use('/api/v1/match', match_1.default);
app.use('/api/v1/ai', ai_1.default);
// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
// Error handling
app.use(errorHandler_1.errorHandler);
// Database connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/civicpulse';
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
exports.default = app;
