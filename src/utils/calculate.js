/**
 * Caculate point which is perpendicular to p1 or p2
 *
 * @param {*} p1
 * @param {*} p2
 * @param {*} o1: first point of vector
 * @param {*} o2: last point of vector
 * @param {*} listPoint: list point
 * @param {*} distance: distance from point to p1p2
 * @param {*} direction (boolean): direction of point
 * @returns
 */
const calPoint = (p1, p2, distance, direction, p2IsVector = false) => {
  p1[0] *= 10 ** 6;
  p1[1] *= 10 ** 6;
  p2[0] *= 10 ** 6;
  p2[1] *= 10 ** 6;
  var point = [];

  if (!p2IsVector) {
    const temp = Math.sqrt(
      Math.abs(distance ** 2 - ((p1[1] - p2[1]) / (p2[0] - p1[0])) ** 2 - 1)
    );

    point[1] = (direction ? -temp : temp) + p2[1];
    point[0] = ((p1[1] - p2[1]) / (p2[0] - p1[0])) * (point[1] - p2[1]) + p2[0];
  } else {
    const temp = Math.sqrt(
      Math.abs(distance ** 2 / (1 - (p2[1] / p2[0]) ** 2))
    );
    point[0] = (direction ? -temp : temp) + p1[0];
    point[1] = (p2[1] / p2[0]) * (point[0] - p1[0]) + p1[1];
  }

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

export const movePoint = (p1, o1, o2, distance, direction) => {
  const o = [o2[0] - o1[0], o2[1] - o1[1]];
  const point = calPoint([...p1], [...o], distance, direction);
  point[2] = p1[2];
  return point;
};

export const moveMultiplePoint = (listPoint, o1, o2, distance, direction) => {
  const o = [o2[0] - o1[0], o2[1] - o1[1]];
  const points = [];
  listPoint.forEach((p) => {
    const point = calPoint([...p], [...o], distance, direction);
    point[2] = p[2];
    points.push(point);
  });
  return points;
};

export const renderSubPoints = (startPoint, endPoint, numPart) => {
  let subPoints = [];
  let dx = (endPoint[0] - startPoint[0]) / numPart;
  let dy = (endPoint[1] - startPoint[1]) / numPart;
  for (let i = 1; i < numPart; i++)
    subPoints.push([
      startPoint[0] + i * dx,
      startPoint[1] + i * dy,
      startPoint[2],
    ]);
  return [startPoint, ...subPoints, endPoint];
};
