import { Router } from 'express';
import * as AgentController from '../controllers/agent.controller';

const router = new Router();

router.route('/:username')
  .get(AgentController.getAgent);

router.route('/:username/reviews')
  .get(AgentController.getReviews);

router.param('username', AgentController.getAgentByUsername);

export default router;
