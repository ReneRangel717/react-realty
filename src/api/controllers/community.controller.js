import Community from '../models/community';
import errorResponse from '../helpers/errorResponse';

export function getCommunity(req, res) {
  return Community.findOne({ url: req.query.slug })
    .then((community) => {
      res.json({ community });
    })
    .catch((err) => {
      console.log(err);
      errorResponse(res, err);
    });
}
