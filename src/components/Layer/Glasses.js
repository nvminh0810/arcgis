import { useEffect } from 'react';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Glasses(props) {
  useEffect(() => {
    props.glasses.forEach((glass) => {
      drawGlasses(glass);
    });
  }, [props.view]);

  const drawGlasses = (glass) => {
    const { fPoint, lPoint, direct, floor, shrink, mDirect, segment } = glass;

    const info = handleGlassFloor(floor);
    const dGlass = 3;
    const vector = calVector(fPoint, lPoint);
    const back = checkSegment(segment) ? 2 : info.back;
    fPoint[2] = info.oz;

    const p1 = movePoint(
      fPoint,
      vector,
      calDMove(glass),
      mDirect ? !shrink : shrink
    );
    const p2 = movePoint(
      lPoint,
      vector,
      calDMove(glass),
      mDirect ? shrink : !shrink
    );

    var segment1 = calLineSegment(p1, p2, back, direct);
    var segment2 = calLineSegment(segment1[0], segment1[1], dGlass, direct);

    createPolygon(props, {
      height: info.height,
      nodes: [...segment1, ...segment2],
      color: [0, 0, 0, 0.5],
    });
  };

  const handleGlassFloor = (floor) => {
    switch (floor) {
      case 0:
        return {
          back: 2,
          height: 13,
          oz: 20,
        };
      case 1:
        return {
          back: 30,
          height: 4,
          oz: 20,
        };
      case 2:
        return {
          back: 2,
          height: 9,
          oz: 24.5,
        };
      default:
        break;
    }
  };

  const calDMove = (glass) => {
    const { shrink, floor, segment } = glass;
    if (checkSegment(segment)) return 1;
    return shrink ? (floor === 1 ? 13 : 1) : 13;
  };

  const checkSegment = (segment) => {
    return segment === "AA'" || segment === "B'B";
  };
  return null;
}
