import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Glasses(props) {
  const { view } = useSelector((state) => state.commons);
  useEffect(() => {
    const { glass, segment } = props;
    const { fPoint, lPoint, direct, shrink, mDirect, idFloor: floor } = glass;

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

    createPolygon(view, {
      height: info.height,
      nodes: [...segment1, ...segment2],
      color: [100, 100, 100, 0.6],
    });
  }, []);

  const handleGlassFloor = (floor, segment) => {
    switch (floor) {
      case 0:
        return {
          back: 3,
          height: 14,
          oz: 20,
        };
      case 1:
        return {
          back: 32,
          height: 3,
          oz: 20,
        };
      case 2:
        return {
          back: 3,
          height: checkSegment(segment) ? 9.5 : 7,
          oz: 24.5,
        };
      case 3:
        return {
          back: 3,
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

  const checkSegment = (segment) => {
    return segment === 'EF' || segment === 'MN';
  };
  return null;
}
