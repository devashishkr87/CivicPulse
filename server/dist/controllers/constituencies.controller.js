"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstituencies = void 0;
const Candidate_1 = require("@/models/Candidate");
const getConstituencies = async (req, res, next) => {
    try {
        const { state } = req.query;
        if (!state) {
            return res.status(400).json({
                error: true,
                message: 'State is required',
                code: 'VALIDATION_ERROR',
            });
        }
        const constituencies = await Candidate_1.CandidateModel.distinct('constituency', { state });
        res.json(constituencies);
    }
    catch (error) {
        next(error);
    }
};
exports.getConstituencies = getConstituencies;
