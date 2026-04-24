import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/server';

describe('Constituencies Integration', () => {
  it('GET /api/v1/constituencies: should return constituencies for a state', async () => {
    const res = await request(app)
      .get('/api/v1/constituencies')
      .query({ state: 'Maharashtra' });
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toContain('Mumbai North');
  });

  it('GET /api/v1/constituencies: should return 400 if state missing', async () => {
    const res = await request(app).get('/api/v1/constituencies');
    expect(res.status).toBe(400);
  });
});
