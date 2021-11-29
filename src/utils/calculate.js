/**
 * Caculate point which is perpendicular to p1 or p2
 *
 * @param {*} p1
 * @param {*} p2
 * @param {*} distance: distance from point to p1p2
 * @param {*} direction (boolean): direction of point
 * @returns
 */
const calPoint = (p1, p2, distance, direction) => {
  p1[0] *= 10 ** 6;
  p1[1] *= 10 ** 6;
  p2[0] *= 10 ** 6;
  p2[1] *= 10 ** 6;
  var point = [];

  var temp = Math.sqrt(
    Math.abs(distance ** 2 - ((p1[1] - p2[1]) / (p2[0] - p1[0])) ** 2 - 1)
  );

  point[1] = (direction ? -temp : temp) + p2[1];
  point[0] = ((p1[1] - p2[1]) / (p2[0] - p1[0])) * (point[1] - p2[1]) + p2[0];

  point[0] /= 10 ** 6;
  point[1] /= 10 ** 6;

  return point;
};

export const calLineSegment = (p1, p2, distance, direction) => {
  const point1 = calPoint([...p1], [...p2], distance, direction);
  const point2 = calPoint([...p2], [...p1], distance, direction);
  point1[2] = p1[2];
  point2[2] = p1[2];
  return [point1, point2];
};
