import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  movePoint,
  renderSubPoints,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function SideDoors(props) {
  useEffect(() => {
    const { door } = props;
    let { fPoint, lPoint, direct } = door;
    console.log(door);

    const subPoints = renderSubPoints(fPoint, lPoint, 6);
    fPoint = subPoints[2];
    lPoint = subPoints[4];
    fPoint[2] = 20;
    lPoint[2] = 20;

    const vector1 = calVector(fPoint, lPoint, true);
    fPoint = movePoint(fPoint, vector1, 1, direct);
    lPoint = movePoint(lPoint, vector1, 1, direct);

    drawGlass(fPoint, lPoint, direct);
    drawColunms(fPoint, lPoint, direct);
    drawTopDoor([...fPoint], [...lPoint], direct);
  }, []);

  const drawGlass = (fPoint, lPoint, direct) => {
    const segment = calLineSegment(fPoint, lPoint, 1, direct);
    createPolygon({
      height: 5,
      nodes: [fPoint, lPoint, ...segment],
      color: [0, 0, 0, 0.6],
    });
  };

  const drawTopDoor = (fPoint, lPoint, direct) => {
    fPoint[2] = 23.5;
    lPoint[2] = 23.5;
    const segment = calLineSegment(fPoint, lPoint, 5, direct);
    createPolygon({
      height: 1.5,
      nodes: [fPoint, lPoint, ...segment],
      color: '#bebebe',
    });
  };

  const drawColunms = (fPoint, lPoint, direct) => {
    const subPoints = renderSubPoints(fPoint, lPoint, 3);
    const vector2 = calVector(fPoint, lPoint, false);
    subPoints.forEach((point, index) => {
      const segment1 = calLineSegmentBaseVector(
        point,
        vector2,
        1,
        index !== 0 && index !== subPoints.length - 1,
        index !== subPoints.length - 1
      );
      const segment2 = calLineSegment(segment1[0], segment1[1], 5, direct);
      createPolygon({
        height: 5,
        nodes: [...segment1, ...segment2],
        color: '#bebebe',
      });
    });
  };

  return null;
}
