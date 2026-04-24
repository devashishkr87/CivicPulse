"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAIChat = exports.postAIVerify = exports.postAIExplain = void 0;
const aiService_1 = require("@/services/aiService");
const postAIExplain = async (req, res, next) => {
    try {
        const { topic } = req.body;
        const result = await (0, aiService_1.explainTopic)(topic);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.postAIExplain = postAIExplain;
const postAIVerify = async (req, res, next) => {
    try {
        const { claim } = req.body;
        const result = await (0, aiService_1.verifyClaim)(claim);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.postAIVerify = postAIVerify;
const postAIChat = async (req, res, next) => {
    try {
        const { message, history } = req.body;
        const result = await (0, aiService_1.chatReply)(message, history);
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
exports.postAIChat = postAIChat;
