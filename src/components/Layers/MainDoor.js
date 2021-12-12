import { useEffect } from 'react';
import { POINT } from '../../constants/constant_commons';
import {
  calLineSegment,
  calVector,
  movePoint,
  renderSubPoints,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function MainDoor() {
  useEffect(() => {
    const { C, D } = POINT;
    const vector = calVector(C, D, true);
    const p1 = movePoint(C, vector, 5, true);
    const p2 = movePoint(D, vector, 5, true);

    drawPolygon([...C], [...D], 23.5, 0.5, 40);

    drawPolygon([...p1], [...p2], 28.5, 1, 30);
    drawPolygon([...p1], [...p2], 24.5, 0.6, 30);

    const sp1 = renderSubPoints(p1, p2, 10);
    drawPolygon([...sp1[0]], [...sp1[1]], 25.2, 0.5, 30);
    drawPolygon([...sp1[9]], [...sp1[10]], 25.2, 0.5, 30);

    const segement = calLineSegment(p1, p2, 20, false);
    drawPolygon([...segement[1]], [...segement[0]], 25.2, 0.5, 10);

    const sp2 = renderSubPoints(p1, p2, 5);
    drawPolygon([...sp2[0]], [...sp2[1]], 24.5, 5, 3, 'gray');
    drawPolygon([...sp2[4]], [...sp2[5]], 24.5, 5, 3, 'gray');
    drawWheelchairStair([...C, 15], [...D, 15]);
  }, []);
  const drawPolygon = (p1, p2, oz, height, distace, color = 'wheat') => {
    p1[2] = oz;
    p2[2] = oz;

    const segment2 = calLineSegment(p1, p2, distace, false, true);
    createPolygon({
      height,
      nodes: [p1, p2, ...segment2],
      color,
    });
  };

  const drawWheelchairStair = (p1, p2) => {
    const sg = calLineSegment(p1, p2, 30, false);
    createPolygon({
      height: 5.25,
      nodes: [p1, p2, ...sg],
      color: 'wheat',
    });

    const sg1 = calLineSegment(p1, sg[1], 125, false);
    createPolygon({
      height: 5.25,
      nodes: [
        p1,
        sg[1],
        ...sg1.map((item) => {
          item[2] = 10.5;
          return item;
        }),
      ],
      color: 'wheat',
    });

    const sg2 = calLineSegment(p2, sg[0], 125, true);
    createPolygon({
      height: 5.25,
      nodes: [
        p2,
        sg[0],
        ...sg2.map((item) => {
          item[2] = 10.5;
          return item;
        }),
      ],
      color: 'wheat',
    });
  };

  return null;
}
