import { describe, it, expect } from 'vitest';
import { explainTopic, verifyClaim, chatReply } from '../../src/services/aiService';

describe('aiService', () => {
  describe('explainTopic', () => {
    it('should return known topic explanation', async () => {
      const res = await explainTopic('Model Code of Conduct');
      expect(res.explanation).toContain('Election Commission of India');
      expect(res.example).toBeTruthy();
    });

    it('should return fallback for unknown topic', async () => {
      const res = await explainTopic('Unknown Topic');
      expect(res.explanation).toContain('important aspect');
    });
  });

  describe('verifyClaim', () => {
    it('should flag "free" claims as likely false', async () => {
      const res = await verifyClaim('Voters will get free laptops');
      expect(res.verdict).toBe('Likely False');
    });

    it('should mark "cancelled" claims as unverified', async () => {
      const res = await verifyClaim('Elections are cancelled');
      expect(res.verdict).toBe('Unverified');
    });

    it('should return generic unverified for others', async () => {
      const res = await verifyClaim('Random claim');
      expect(res.verdict).toBe('Unverified');
      expect(res.confidence).toBe('Low');
    });
  });

  describe('chatReply', () => {
    it('should handle "id" keyword', async () => {
      const res = await chatReply('What ID do I need?', []);
      expect(res.reply).toContain('Voter ID card (EPIC)');
    });

    it('should handle "polling" keyword', async () => {
      const res = await chatReply('Where is my polling station?', []);
      expect(res.reply).toContain('voters.eci.gov.in');
    });

    it('should return fallback for others', async () => {
      const res = await chatReply('Hello', []);
      expect(res.reply).toContain('I can help with questions about voter registration');
    });
  });
});
