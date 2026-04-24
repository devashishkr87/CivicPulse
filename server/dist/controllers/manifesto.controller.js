"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifesto = void 0;
const Manifesto_1 = require("@/models/Manifesto");
const getManifesto = async (req, res, next) => {
    try {
        const { party } = req.params;
        const manifesto = await Manifesto_1.ManifestoModel.findOne({ party });
        if (!manifesto) {
            return res.status(404).json({
                error: true,
                message: `Manifesto for party ${party} not found`,
                code: 'NOT_FOUND',
            });
        }
        res.json(manifesto);
    }
    catch (error) {
        next(error);
    }
};
exports.getManifesto = getManifesto;
