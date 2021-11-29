import { useEffect } from 'react';
import { POINT } from '../../constants/commons';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Glasses(props) {
  useEffect(() => {
    const { C, D } = POINT;
    const subPoints = renderSubPoints([...C, 20], [...D, 20], 3);

    for (let index = 0; index < subPoints.length - 1; index++) {
      const f1 = subPoints[index];
      const f2 = subPoints[index + 1];

      const points = renderSubPoints(f1, f2, 3);

      let segment = calLineSegment(points[0], points[1], 3, false);
      createPolygon(props, {
        height: 4,
        nodes: [points[0], points[1], ...segment],
        color: 'gray',
      });

      segment = calLineSegment(points[1], points[2], 3, false);
      createPolygon(props, {
        height: 1,
        nodes: [points[1], points[2], ...segment],
        color: 'gray',
      });
      let x1 = [...points[1]];
      let x2 = [...points[2]];
      x1[2] = 23;
      x2[2] = 23;
      segment = calLineSegment(x1, x2, 3, false);
      console.log([x1, x2, ...segment]);
      createPolygon(props, {
        height: 1,
        nodes: [x1, x2, ...segment],
        color: 'gray',
      });

      segment = calLineSegment(points[2], points[3], 3, false);

      createPolygon(props, {
        height: 4,
        nodes: [points[2], points[3], ...segment],
        color: 'gray',
      });
    }
  }, [props.view]);

  return null;
}
