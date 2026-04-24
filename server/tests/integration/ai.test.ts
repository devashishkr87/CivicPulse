import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/server';

describe('AI Integration', () => {
  it('AC11: POST /api/v1/ai/verify with empty claim returns 400', async () => {
    const res = await request(app)
      .post('/api/v1/ai/verify')
      .send({ claim: '' });
    
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('AC11: POST /api/v1/ai/verify with short claim returns 400', async () => {
    const res = await request(app)
      .post('/api/v1/ai/verify')
      .send({ claim: 'short' });
    
    expect(res.status).toBe(400);
  });

  it('AC12: POST /api/v1/ai/chat with valid message returns reply', async () => {
    const res = await request(app)
      .post('/api/v1/ai/chat')
      .send({ message: 'What ID do I need?', history: [] });
    
    expect(res.status).toBe(200);
    expect(res.body.reply).toBeTruthy();
    expect(res.body.reply).toContain('Voter ID');
  });

  it('POST /api/v1/ai/explain: should return explanation', async () => {
    const res = await request(app)
      .post('/api/v1/ai/explain')
      .send({ topic: 'EVM and VVPAT' });
    
    expect(res.status).toBe(200);
    expect(res.body.explanation).toBeTruthy();
  });
});
