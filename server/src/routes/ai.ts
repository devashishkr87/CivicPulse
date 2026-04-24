import { Router } from 'express';
import { postAIExplain, postAIVerify, postAIChat } from '@/controllers/ai.controller';
import { validateAIExplain, validateAIVerify, validateAIChat } from '@/middleware/validate';

const router = Router();

router.post('/explain', validateAIExplain, postAIExplain);
router.post('/verify', validateAIVerify, postAIVerify);
router.post('/chat', validateAIChat, postAIChat);

export default router;
