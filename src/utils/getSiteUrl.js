import config from '../config';

export default function (url) {
  return `http://${config.host}:${config.port}${url}`;
}
