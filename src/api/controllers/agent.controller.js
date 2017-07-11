import Agent from '../models/agent';
import Review from '../models/review';
import errorResponse from '../helpers/errorResponse';

export function getAgent(req, res) {
  res.json({ agent: req.agent });
}

export function getReviews(req, res) {
  Review.find({ user: req.agent })
  .then((reviews) => {
    res.json({ reviews });
  })
  .catch((err) => {
    console.log(err);
    errorResponse(res, err);
  });
}

export function getAgentByUsername(req, res, next, username) {
  return Agent.findOne({ username })
    .then((agent) => {
      if (agent) {
        Object.assign(req, { agent });
        return next();
      }

      return res.status(404).json({
        error: `Agent ${username} not found`
      });
    });
}
