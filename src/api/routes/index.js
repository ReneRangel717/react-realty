import { Router } from 'express';
import propertyRoutes from './property.routes';
import communityRoutes from './community.routes';
import agentRoutes from './agent.routes';

const router = new Router();

router.use('/property', propertyRoutes);
router.use('/community', communityRoutes);
router.use('/agent', agentRoutes);

export default router;
