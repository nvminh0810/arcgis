import { useEffect } from 'react';
import { POINT } from '../../constants/commons';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Glasses(props) {
  useEffect(() => {
    (async () => {
      //   drawGlasses(B, C, false);
      //   drawGlasses(C, D, false);
      //   drawWalls(B, C, false);
      //   drawWalls(C, D, false);
      props.glasses.forEach((item) => {
        drawGlasses(item.fPoint, item.lPoint, item.oz, item.direct);
      });
    })();
  }, [props.view]);

  const drawGlasses = (A, B, oz, direction) => {
    A[2] = oz;
    const vector = calVector(A, B);
    const p1 = movePoint(A, vector, 1, true);
    const p2 = movePoint(B, vector, 1, false);

    var segment1 = calLineSegment(p1, p2, 3, direction);
    console.log(segment1);
    var segment2 = calLineSegment(segment1[0], segment1[1], 3, direction);
    console.log([...segment1, ...segment2]);
    createPolygon(props, {
      height: 25,
      nodes: [...segment1, ...segment2],
      color: [0, 0, 0, 0.5],
    });
  };
  const drawWalls = (A, B, direction = true) => {
    A[2] = 15;
    B[2] = 15;
    var segment1 = calLineSegment(A, B, 3, direction);
    console.log([A, B, ...segment1]);
    createPolygon(props, {
      height: 25,
      nodes: [A, B, ...segment1],
      color: 'gray',
    });
  };
  return null;
}
