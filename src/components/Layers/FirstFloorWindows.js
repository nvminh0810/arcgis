import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function FirstFloorWindows(props) {
  const { view } = useSelector((state) => state.commons);

  useEffect(() => {
    const { window, segment } = props;
    const { fPoint, lPoint, count, direct } = window;

    const ignore = segment === 'AX' || segment === 'FI' ? [2, 3] : [];

    const subPoints = renderSubPoints([...fPoint, 20], [...lPoint, 20], count);

    for (let index = 0; index < subPoints.length - 1; index++) {
      if (!ignore.includes(index)) {
        const f1 = subPoints[index];
        const f2 = subPoints[index + 1];

        const points = renderSubPoints(f1, f2, 3);

        let flag = false;
        for (let i = 0; i < points.length - 1; i++) {
          let p1 = [];
          let p2 = [];
          let segment = [];
          let height = 0;

          p1 = [...points[i]];
          p2 = [...points[i + 1]];

          if (i % 2 === 0) {
            height = 4;
          } else {
            height = 1;
            if (flag) {
              p1[2] = 23;
              p2[2] = 23;
            } else {
              flag = true;
              i--;
            }
          }

          segment = calLineSegment(p1, p2, 3, direct);
          createPolygon(view, {
            height,
            nodes: [p1, p2, ...segment],
            color: 'gray',
          });
        }
      }
    }
  }, []);

  return null;
}
