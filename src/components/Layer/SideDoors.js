import { useEffect } from 'react';
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
    const { sideDoors } = props;
    sideDoors.forEach((sideDoor) => drawSideDoor(sideDoor));
  }, [props.view]);

  const drawSideDoor = (sideDoor) => {
    let { fPoint, lPoint, direct } = sideDoor;
    fPoint[2] = 20;
    lPoint[2] = 20;

    const vector1 = calVector(fPoint, lPoint, true);
    fPoint = movePoint(fPoint, vector1, 1, direct);
    lPoint = movePoint(lPoint, vector1, 1, direct);

    drawGlass(fPoint, lPoint, direct);
    drawColunms(fPoint, lPoint, direct);
    drawTopDoor([...fPoint], [...lPoint], direct);
  };

  const drawGlass = (fPoint, lPoint, direct) => {
    const segment = calLineSegment(fPoint, lPoint, 1, direct);
    createPolygon(props, {
      height: 5,
      nodes: [fPoint, lPoint, ...segment],
      color: [0, 0, 0, 0.6],
    });
  };

  const drawTopDoor = (fPoint, lPoint, direct) => {
    fPoint[2] = 23.5;
    lPoint[2] = 23.5;
    const segment = calLineSegment(fPoint, lPoint, 5, direct);
    createPolygon(props, {
      height: 1.5,
      nodes: [fPoint, lPoint, ...segment],
      color: 'white',
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
      createPolygon(props, {
        height: 5,
        nodes: [...segment1, ...segment2],
        color: 'white',
      });
    });
  };

  return null;
}
