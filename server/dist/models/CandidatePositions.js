"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidatePositionsModel = void 0;
const mongoose_1 = require("mongoose");
const CandidatePositionsSchema = new mongoose_1.Schema({
    candidate_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    scores: {
        economy: { type: Number, required: true, min: 1, max: 5 },
        education: { type: Number, required: true, min: 1, max: 5 },
        healthcare: { type: Number, required: true, min: 1, max: 5 },
        environment: { type: Number, required: true, min: 1, max: 5 },
    },
});
exports.CandidatePositionsModel = (0, mongoose_1.model)('CandidatePositions', CandidatePositionsSchema);
