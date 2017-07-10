import { Router } from 'express';
import propertyRoutes from './property.routes';
import communityRoutes from './community.routes';

const router = new Router();

router.use('/property', propertyRoutes);
router.use('/community', communityRoutes);

export default router;
