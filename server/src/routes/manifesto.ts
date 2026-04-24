import { Router } from 'express';
import { getManifesto } from '@/controllers/manifesto.controller';

const router = Router();

router.get('/:party', getManifesto);

export default router;
