"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMatch = void 0;
const Candidate_1 = require("@/models/Candidate");
const CandidatePositions_1 = require("@/models/CandidatePositions");
const Manifesto_1 = require("@/models/Manifesto");
const matchFormula_1 = require("@/lib/matchFormula");
const postMatch = async (req, res, next) => {
    try {
        const { state, constituency, priorities } = req.body;
        // 1. Find candidates in state+constituency
        const candidates = await Candidate_1.CandidateModel.find({ state, constituency });
        // 2. For each candidate, find their positions and manifesto
        const results = await Promise.all(candidates.map(async (c) => {
            const positions = await CandidatePositions_1.CandidatePositionsModel.findOne({ candidate_id: c._id });
            const manifesto = await Manifesto_1.ManifestoModel.findOne({ party: c.party });
            if (!positions || !manifesto) {
                throw new Error(`Missing data for candidate ${c.name}`);
            }
            const { matchScore, breakdown } = (0, matchFormula_1.calculateMatch)(priorities, positions.scores);
            return {
                ...c.toObject(),
                positions: positions.scores,
                manifesto: manifesto.summary,
                matchScore,
                breakdown,
            };
        }));
        // 3. Sort by matchScore descending
        results.sort((a, b) => b.matchScore - a.matchScore);
        res.json(results);
    }
    catch (error) {
        next(error);
    }
};
exports.postMatch = postMatch;
