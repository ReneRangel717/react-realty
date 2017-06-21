export default function (state, action) {
  const { center, zoom, bounds, marginBounds } = action;
  return state.update('mapInfo', mapInfo => mapInfo.merge({ center, zoom, bounds, marginBounds }))
    .set('infoBoxIndex', -1)
    .set('briefBoxIndex', -1);
}
