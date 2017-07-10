import { Router } from 'express';
import * as CommunityController from '../controllers/community.controller';

const router = new Router();

router.route('/')
  .get(CommunityController.getCommunity);

export default router;
