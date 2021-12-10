import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function RoofWindows() {
  const { roofWindows } = useSelector((state) => state.commons);
  useEffect(() => {
    roofWindows?.forEach((roofWindow) => {
      drawRoofWindow(roofWindow);
    });
  }, [roofWindows]);

  const drawRoofWindow = (roofWindow) => {
    const { fPoint, lPoint, direct, mDirect, check } = roofWindow;
    fPoint[2] = 31.5;
    lPoint[2] = 31.5;

    const vector = calVector(fPoint, lPoint, true);
    const p1 = movePoint(fPoint, vector, 1, mDirect);
    const p2 = movePoint(lPoint, vector, 1, mDirect);

    const segment = calLineSegment(p1, p2, 2.25, direct);
    createPolygon({
      height: 1,
      nodes: [p1, p2, ...segment],
      color: 'gray',
    });

    const f1 = drawPolygon(p1, segment[1], check, !mDirect, direct);
    const f2 = drawPolygon(p2, segment[0], check, mDirect, direct);

    const segment2 = calLineSegment(f1, f2, 2.25, !direct);
    createPolygon({
      height: 2.5,
      nodes: [p1, p2, ...segment2],
      color: [0, 0, 0, 0.5],
    });
  };

  const drawPolygon = (p1, p2, check, mDirect, direct) => {
    const segment = calLineSegment(p1, p2, 8, check ? mDirect : !mDirect);
    createPolygon({
      height: 2.5,
      nodes: [p1, p2, ...segment],
      color: 'gray',
    });
    return segment[1];
  };

  return null;
}
