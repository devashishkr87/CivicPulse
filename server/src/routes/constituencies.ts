import { Router } from 'express';
import { getConstituencies } from '@/controllers/constituencies.controller';

const router = Router();

router.get('/', getConstituencies);

export default router;
