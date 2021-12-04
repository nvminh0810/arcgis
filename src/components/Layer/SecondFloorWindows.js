import { useEffect } from 'react';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function SecondFloorWindows(props) {
  useEffect(() => {
    const { windows } = props;
    windows.forEach((window) => drawWindows(window));
  }, [props.view]);

  const drawWindows = (window) => {
    const { fPoint, lPoint, count, direct, segment: sg } = window;
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

        if (checkIsWall(sg, subPoints.length, points.length, index, i)) {
          height = 7;
        } else {
          if (flag) {
            height = 1;
            p1[2] = 30.5;
            p2[2] = 30.5;
          } else {
            height = 0.5;
            i--;
            flag = true;
          }
          drawWoodsInWindow(p1, p2, direct, sg);
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

  const drawWoodsInWindow = (point1, point2, direct, sg) => {
    let segment = [];
    for (let index = 0; index < 2; index++) {
      let p1 = [...point1];
      let p2 = [...point2];
      if (index === 0 && sg !== 'I1I2') {
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

  const checkIsWall = (sg, length1, length2, index, i) => {
    if (sg === 'I1I2') {
      if (
        (index === 0 && i === 0) ||
        (index === length1 - 2 && i === length2 - 2)
      )
        return true;
      return false;
    } else {
      if (i % 2 === 0) return true;
      else return false;
    }
  };
  return null;
}
