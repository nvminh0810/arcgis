import { useEffect } from 'react';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function RoofWindows(props) {
  useEffect(() => {
    props.roofWindows.forEach((roofWindow) => {
      drawRoofWindow(roofWindow);
    });
  }, [props.view]);

  const drawRoofWindow = (roofWindow) => {
    const { fPoint, lPoint, direct, mDirect } = roofWindow;
    fPoint[2] = 31.5;
    lPoint[2] = 31.5;
    const vector = calVector(fPoint, lPoint, true);
    const p1 = movePoint(fPoint, vector, 1, mDirect);
    const p2 = movePoint(lPoint, vector, 1, mDirect);
    const segment = calLineSegment(p1, p2, 2, direct);
    createPolygon(props, {
      height: 3,
      nodes: [p1, p2, ...segment],
      color: 'gray',
    });
  };

  return null;
}
