import { Router } from 'express';
import * as PropertyController from '../controllers/property.controller';

const router = new Router();

router.route('/property')
  .get(PropertyController.getProperty);

export default router;
