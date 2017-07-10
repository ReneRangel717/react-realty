import { Router } from 'express';
import * as PropertyController from '../controllers/property.controller';

const router = new Router();

router.route('/')
  .get(PropertyController.getProperty);

export default router;
