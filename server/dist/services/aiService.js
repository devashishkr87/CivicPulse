"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatReply = exports.verifyClaim = exports.explainTopic = void 0;
// ─────────────────────────────────────────────────────────────────────────────
// REAL API: To replace mocks with a real LLM:
// 1. npm install openai (or @anthropic-ai/sdk)
// 2. Add AI_API_KEY to .env and .env.example
// 3. Replace each function body with the real API call
// 4. Keep the same return type — callers do not change
// ─────────────────────────────────────────────────────────────────────────────
const EXPLANATIONS = {
    'Model Code of Conduct': {
        explanation: 'The Model Code of Conduct is a set of guidelines enforced by the Election Commission of India during election periods. It prevents the ruling party from using government resources, officials, or funds for campaign activities.',
        example: 'A ruling-party minister cannot inaugurate a new bridge or distribute welfare payments during the election period.',
    },
    'Anti-Defection Law': {
        explanation: 'The Anti-Defection Law, under the Tenth Schedule of the Constitution, prevents elected representatives from switching political parties without valid reason. Members who defect lose their parliamentary or legislative seat.',
        example: 'An MP elected on a Congress ticket who votes against the party whip can be disqualified from Parliament.',
    },
    'EVM and VVPAT': {
        explanation: 'Electronic Voting Machines replace paper ballots with a tamper-resistant digital recording. VVPAT adds a physical paper slip that displays the voter\'s choice for 7 seconds before dropping into a sealed box, enabling post-election audits.',
        example: 'After pressing the button for Candidate A, the VVPAT screen shows "Candidate A – Party B" for 7 seconds.',
    },
};
async function explainTopic(topic) {
    const response = EXPLANATIONS[topic];
    if (!response) {
        return {
            explanation: `${topic} is an important aspect of the Indian electoral system that helps ensure free, fair, and transparent elections.`,
            example: 'Contact the Election Commission of India at eci.gov.in for more details.',
        };
    }
    return response;
}
exports.explainTopic = explainTopic;
async function verifyClaim(claim) {
    const lower = claim.toLowerCase();
    if (lower.includes('free') || lower.includes('no cost')) {
        return {
            verdict: 'Likely False',
            confidence: 'High',
            explanation: 'Claims about free items given to voters are a common type of election misinformation. Offering gifts to voters is illegal under the Representation of the People Act.',
        };
    }
    if (lower.includes('cancelled') || lower.includes('postponed')) {
        return {
            verdict: 'Unverified',
            confidence: 'Medium',
            explanation: 'Claims about election cancellations should be verified directly on the Election Commission of India website at eci.gov.in.',
        };
    }
    return {
        verdict: 'Unverified',
        confidence: 'Low',
        explanation: 'This claim could not be verified from known sources. Please check eci.gov.in or a trusted news source for accurate information.',
    };
}
exports.verifyClaim = verifyClaim;
const CHAT_RESPONSES = [
    {
        keywords: ['polling station', 'polling booth', 'where to vote', 'vote location'],
        reply: 'You can find your polling station by visiting voters.eci.gov.in and searching by your name or Voter ID number. Your station is typically within 2 km of your registered address.',
    },
    {
        keywords: ['id', 'identity', 'document', 'what to bring', 'id card'],
        reply: 'You need your Voter ID card (EPIC). If unavailable, you may use any of 12 alternative documents: Aadhaar card, Passport, Driving Licence, PAN card, MNREGA job card, bank passbook with photo, or other government-issued photo ID.',
    },
    {
        keywords: ['time', 'hours', 'open', 'when', 'timing'],
        reply: 'Polling stations generally open at 7:00 AM and close at 6:00 PM. Times may vary by constituency. Check your voter slip or the ECI website for your specific station\'s hours.',
    },
    {
        keywords: ['evm', 'voting machine', 'how to vote', 'press button'],
        reply: 'Find your name on the candidate list on the EVM. Press the blue button next to your chosen candidate\'s name and symbol. The machine beeps and the VVPAT shows your choice for 7 seconds to confirm.',
    },
];
async function chatReply(message, _history) {
    const lower = message.toLowerCase();
    for (const entry of CHAT_RESPONSES) {
        if (entry.keywords.some((kw) => lower.includes(kw))) {
            return { reply: entry.reply };
        }
    }
    return {
        reply: 'I can help with questions about voter registration, polling stations, required ID documents, and voting procedures. Please ask me anything about the Indian election process.',
    };
}
exports.chatReply = chatReply;
