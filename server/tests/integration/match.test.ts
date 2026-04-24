import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/server';

describe('Match Integration', () => {
  it('POST /api/v1/match: should return 400 for invalid priority', async () => {
    const res = await request(app)
      .post('/api/v1/match')
      .send({
        state: 'Maharashtra',
        constituency: 'Mumbai North',
        priorities: { economy: 6, education: 3, healthcare: 2, environment: 1 }
      });
    
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('VALIDATION_ERROR');
  });

  it('POST /api/v1/match: should return 400 for missing state', async () => {
    const res = await request(app)
      .post('/api/v1/match')
      .send({
        constituency: 'Mumbai North',
        priorities: { economy: 5, education: 3, healthcare: 2, environment: 1 }
      });
    
    expect(res.status).toBe(400);
  });

  it('POST /api/v1/match: should return sorted candidates for valid body', async () => {
    const res = await request(app)
      .post('/api/v1/match')
      .send({
        state: 'Maharashtra',
        constituency: 'Mumbai North',
        priorities: { economy: 5, education: 3, healthcare: 2, environment: 1 }
      });
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 1) {
      expect(res.body[0].matchScore).toBeGreaterThanOrEqual(res.body[1].matchScore);
    }
  });
});
