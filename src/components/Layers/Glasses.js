import { useEffect } from 'react';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Glasses(props) {
  useEffect(() => {
    const { glass, floor, segment } = props;
    const { fPoint, lPoint, direct, shrink, mDirect } = glass;

    const info = handleGlassFloor(floor, segment);
    const dGlass = 3;
    const vector = calVector(fPoint, lPoint);

    const p1 = movePoint(
      [...fPoint, info.oz],
      vector,
      calDMove(shrink, floor),
      mDirect ? !shrink : shrink
    );
    const p2 = movePoint(
      [...lPoint, info.oz],
      vector,
      calDMove(shrink, floor),
      mDirect ? shrink : !shrink
    );

    var segment1 = calLineSegment(p1, p2, info.back, direct);
    var segment2 = calLineSegment(segment1[0], segment1[1], dGlass, direct);

    createPolygon({
      height: info.height,
      nodes: [...segment1, ...segment2],
      color: [100, 100, 100, 0.8],
    });
  }, []);

  const handleGlassFloor = (floor, segment) => {
    switch (floor) {
      case 0:
        return {
          back: 2,
          height: 11.5,
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
          back: checkSeg(segment) ? 10 : 2,
          height: 7,
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

  const calDMove = (shrink, floor) => {
    return shrink ? (floor === 1 ? 15 : 1) : floor === 1 ? 1 : 15;
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
