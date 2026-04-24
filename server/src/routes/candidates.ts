import { Router } from 'express';
import { getCandidates } from '@/controllers/candidates.controller';

const router = Router();

router.get('/', getCandidates);

export default router;
