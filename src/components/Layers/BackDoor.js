import { useEffect } from 'react';
import { POINT } from '../../constants/constant_commons';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function BackDoor() {
  useEffect(() => {
    const { P, Q } = POINT;
    drawPolygon([...P], [...Q], 15, 5, 50);
    drawPolygon([...P], [...Q], 23.5, 0.5, 50);
    drawPolygon([...P], [...Q], 24.5, 0.6, 30);

    const subPoints = renderSubPoints(P, Q, 9);
    const sP = subPoints[1];
    const sQ = subPoints[8];

    drawPolygon([...P], [...sP], 25.2, 0.5, 30);
    drawPolygon([...Q], [...sQ], 25.2, 0.5, 30);

    const segement = calLineSegment(P, Q, 20, true);
    drawPolygon([...segement[1]], [...segement[0]], 25.2, 0.5, 10);
  }, []);

  const drawPolygon = (p1, p2, oz, height, distace) => {
    p1[2] = oz;
    p2[2] = oz;
    const segment2 = calLineSegment(p1, p2, distace, true);
    createPolygon({
      height,
      nodes: [p1, p2, ...segment2],
      color: 'wheat',
    });
  };

  return null;
}
