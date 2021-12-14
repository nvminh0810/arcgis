import { useEffect } from 'react';
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  renderSubPoints,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function SecondFloorWindows(props) {
  useEffect(() => {
    const { window, segment: sg } = props;
    const { fPoint, lPoint, count, direct } = window;

    if (checkSeg(sg)) {
      drawWindow2(window, sg);
      return;
    }

    const subPoints = renderSubPoints(
      [...fPoint, 24.5],
      [...lPoint, 24.5],
      count
    );

    const ignore = sg === 'OR' ? [2, 3, 4] : [];

    for (let index = 0; index < subPoints.length - 1; index++) {
      if (!ignore.includes(index)) {
        const f1 = subPoints[index];
        const f2 = subPoints[index + 1];

        const points = renderSubPoints(f1, f2, 3);
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = [...points[i]];
          const p2 = [...points[i + 1]];
          drawWindow(p1, p2, true, i, direct, true);
        }
      }
    }

    if (sg === 'OR') {
      const f1 = subPoints[2];
      const f2 = subPoints[5];

      const points = renderSubPoints(f1, f2, 9);
      const bigWindow = [points[0], points[1], points[8], points[9]];
      for (let i = 0; i < bigWindow.length - 1; i++) {
        const p1 = [...bigWindow[i]];
        const p2 = [...bigWindow[i + 1]];
        drawWindow(p1, p2, true, i, direct, false);
      }
    }
  }, []);

  const drawWindow = (point1, point2, flag, i, direct, hasTwoRow) => {
    let height = 0;
    const p1 = [...point1];
    const p2 = [...point2];
    if (i % 2 === 0) {
      height = 7;
    } else {
      if (flag) {
        height = 0.5;
        drawWoodsInWindow(p1, p2, direct, hasTwoRow);
        drawWindow(p1, p2, false, i, direct, hasTwoRow);
      } else {
        height = 1;
        p1[2] = 30.5;
        p2[2] = 30.5;
      }
    }

    const segment = calLineSegment(p1, p2, 3, direct);
    createPolygon({
      height,
      nodes: [p1, p2, ...segment],
      color: 'gray',
    });
  };

  const drawWindow2 = (window, sg) => {
    const { fPoint, lPoint, direct, count } = window;

    [24.5, 30.5].forEach((item, index) => {
      const p1 = [...fPoint];
      const p2 = [...lPoint];
      const segment = calLineSegment(p1, p2, 15, direct);
      createPolygon({
        height: index === 0 ? 0.5 : 1,
        nodes: [p1, p2, ...segment].map((node) => {
          node[2] = item;
          return node;
        }),
        color: 'gray',
      });
    });

    const subPoints = renderSubPoints(fPoint, lPoint, count);
    const vector = calVector(fPoint, lPoint, false);
    for (let i = 0; i < subPoints.length; i++) {
      const p = [...subPoints[i]];
      let seg1 = [];
      let seg2 = [];
      let height = 0;
      if (
        sg !== 'CD' ||
        (sg === 'CD' && (i === 0 || i === subPoints.length - 1))
      ) {
        p[2] = 24.5;
        height = 7;
      } else {
        p[2] = 29;
        height = 1.5;
      }

      seg1 = calLineSegmentBaseVector(p, vector, 2, true);
      seg2 = calLineSegment(seg1[0], seg1[1], 15, direct);
      createPolygon({
        height,
        nodes: [...seg1, ...seg2],
        color: 'gray',
      });
      if (i !== subPoints.length - 1) {
        const points = renderSubPoints(
          [...subPoints[i]],
          [...subPoints[i + 1]],
          5
        );
        for (let index = 1; index < points.length - 1; index++) {
          const p1 = [...points[index]];
          let height = 0;
          if (
            sg !== 'CD' ||
            (sg === 'CD' &&
              ((i === 0 && index === 1) ||
                (i === subPoints.length - 2 && index === points.length - 2)))
          ) {
            p1[2] = 25;
            height = 5.5;
          } else {
            p1[2] = 29.5;
            height = 1;
          }
          const seg3 = calLineSegmentBaseVector(p1, vector, 1.5, true);
          const seg4 = calLineSegment(seg3[0], seg3[1], 3, direct);

          createPolygon({
            height,
            nodes: [...seg3, ...seg4],
            color: 'wheat',
          });
        }
      }
    }
  };

  const drawWoodsInWindow = (point1, point2, direct, hasTwoRow) => {
    let segment = [];
    for (let index = 0; index < 2; index++) {
      let p1 = [...point1];
      let p2 = [...point2];
      if (index === 0) {
        p1[2] = 28.5;
        p2[2] = 28.5;
      } else {
        p1[2] = 25;
        p2[2] = 25;
      }
      segment = calLineSegment(p1, p2, 3, direct);

      createPolygon({
        height: 0.7,
        nodes: [p1, p2, ...segment],
        color: 'white',
      });
      if (!hasTwoRow) break;
    }
  };

  const checkSeg = (seg) => {
    return (
      seg.includes('C') ||
      seg.includes('D') ||
      seg.includes('U') ||
      seg.includes('L')
    );
  };
  return null;
}
