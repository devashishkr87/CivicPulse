import { Router } from 'express';
import { postMatch } from '@/controllers/match.controller';
import { validateMatch } from '@/middleware/validate';

const router = Router();

router.post('/', validateMatch, postMatch);

export default router;
