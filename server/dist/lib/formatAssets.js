"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAssets = void 0;
/**
 * Format an integer-lakh asset value into a human-readable ₹ string.
 * @param lakhs - integer value in lakhs (e.g. 150 = ₹1.5 crore)
 * @returns Formatted string, e.g. "₹1.5 crore" or "₹45 lakh"
 */
function formatAssets(lakhs) {
    if (lakhs <= 0)
        return '₹0';
    if (lakhs >= 100) {
        const crore = lakhs / 100;
        return `₹${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(1)} crore`;
    }
    return `₹${lakhs} lakh`;
}
exports.formatAssets = formatAssets;
