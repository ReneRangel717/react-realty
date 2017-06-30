import Property from '../models/property';
import errorResponse from '../helpers/errorResponse';

export function getProperty(req, res) {
  return Property.findOne({ url: req.query.slug })
    .then((property) => {
      res.json({ property });
    })
    .catch((err) => {
      console.log(err);
      errorResponse(res, err);
    });
}
