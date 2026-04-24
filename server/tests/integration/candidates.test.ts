import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/server';

describe('Candidates Integration', () => {
  it('GET /api/v1/candidates: should return 400 if params missing', async () => {
    const res = await request(app).get('/api/v1/candidates');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe(true);
  });

  it('GET /api/v1/candidates: should return candidates for valid params', async () => {
    // Assuming data is seeded
    const res = await request(app)
      .get('/api/v1/candidates')
      .query({ state: 'Maharashtra', constituency: 'Mumbai North' });
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
