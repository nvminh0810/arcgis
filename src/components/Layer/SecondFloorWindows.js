import { useEffect } from 'react';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function SecondFloorWindows(props) {
  useEffect(() => {
    const { windows } = props;
    windows.forEach((window) => drawWindows(window));
  }, [props.view]);

  const drawWindows = (window) => {
    const { fPoint, lPoint, count, direct } = window;
    const subPoints = renderSubPoints(
      [...fPoint, 24.5],
      [...lPoint, 24.5],
      count
    );

    for (let index = 0; index < subPoints.length - 1; index++) {
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
          height = 7;
        } else {
          height = 0.5;
          if (flag) {
            height = 1;
            p1[2] = 30.5;
            p2[2] = 30.5;
          } else {
            flag = true;
            i--;
          }
          drawWoodsInWindow(p1, p2, direct);
        }

        segment = calLineSegment(p1, p2, 3, direct);
        createPolygon(props, {
          height,
          nodes: [p1, p2, ...segment],
          color: 'gray',
        });
      }
    }
  };

  const drawWoodsInWindow = (point1, point2, direct) => {
    let segment = [];
    for (let index = 0; index < 2; index++) {
      let p1 = [...point1];
      let p2 = [...point2];
      if (index === 0) {
        p1[2] = 25;
        p2[2] = 25;
      } else {
        p1[2] = 28.5;
        p2[2] = 28.5;
      }
      segment = calLineSegment(p1, p2, 3, direct);

      createPolygon(props, {
        height: 0.7,
        nodes: [p1, p2, ...segment],
        color: 'white',
      });
    }
  };

  return null;
}
