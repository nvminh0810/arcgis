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

    const info = handleGlassFloor(floor, segment);
    const dGlass = 3;
    const vector = calVector(fPoint, lPoint);
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

    var segment1 = calLineSegment(p1, p2, info.back, direct);
    var segment2 = calLineSegment(segment1[0], segment1[1], dGlass, direct);

    createPolygon(props, {
      height: info.height,
      nodes: [...segment1, ...segment2],
      color: [100, 100, 100, 0.8],
    });
  };

  const handleGlassFloor = (floor, segment) => {
    switch (floor) {
      case 0:
        return {
          back: 2,
          height: 14,
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
          height: checkSegment(segment) ? 9.5 : 7,
          oz: 24.5,
        };
      case 3:
        return {
          back: 2,
          height: 2.5,
          oz: 31.5,
        };
      default:
        break;
    }
  };

  const calDMove = (glass) => {
    const { shrink, floor } = glass;
    return shrink ? (floor === 1 ? 13 : 1) : floor === 3 ? 1 : 13;
  };

  const checkSegment = (segment) => {
    return segment === 'EF' || segment === 'MN';
  };
  return null;
}
