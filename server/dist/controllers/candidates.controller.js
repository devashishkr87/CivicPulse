"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidates = void 0;
const Candidate_1 = require("@/models/Candidate");
const getCandidates = async (req, res, next) => {
    try {
        const { state, constituency } = req.query;
        if (!state || !constituency) {
            return res.status(400).json({
                error: true,
                message: 'State and constituency are required',
                code: 'VALIDATION_ERROR',
            });
        }
        const candidates = await Candidate_1.CandidateModel.find({ state, constituency }).limit(4);
        res.json(candidates);
    }
    catch (error) {
        next(error);
    }
};
exports.getCandidates = getCandidates;
