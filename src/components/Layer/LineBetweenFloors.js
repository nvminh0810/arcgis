import { useEffect } from 'react';
import { POINT } from '../../constants/commons';
import {
  calLineSegment,
  renderSubPoints,
  calVector,
  movePoint,
  calLineSegmentBaseVector,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function LineBetweenFloors(props) {
  useEffect(() => {
    const { lineBetweenFloors } = props;
    lineBetweenFloors.forEach((line) => drawLine(line));
  }, [props.view]);

  const drawLine = (line) => {
    drawCol(line);
    drawFrontWall(line);
    !line.isLong && drawBackWall(line);
  };

  const drawCol = (line) => {
    const { fPoint, lPoint, direct, count, isLong } = line;
    const B = [...fPoint, 24];
    const C = [...lPoint, 24];

    const subPoints = renderSubPoints(B, C, count);
    for (let index = 0; index < subPoints.length - 1; index++) {
      const p1 = subPoints[index];
      const p2 = subPoints[index + 1];
      const midPoint = renderSubPoints(p1, p2, 2)[1];

      const vector = calVector(p1, p2, false);
      const segment1 = calLineSegmentBaseVector(
        midPoint,
        vector,
        1.5,
        true,
        true
      );

      const segment2 = calLineSegment(
        segment1[0],
        segment1[1],
        isLong ? 30 : 0.5,
        !direct
      );
      createPolygon(props, {
        height: 0.5,
        nodes: [...segment1, ...segment2],
        color: 'white',
      });
    }
  };

  const drawFrontWall = (line) => {
    const { fPoint, lPoint, direct } = line;
    const B = [...fPoint, 23.5];
    const C = [...lPoint, 23.5];

    let segment1 = calLineSegment(B, C, 0.5, direct);
    createPolygon(props, {
      height: 0.5,
      nodes: [B, C, ...segment1],
      color: [201, 201, 201],
    });
  };

  const drawBackWall = (line) => {
    const { fPoint, lPoint, direct, mDirect } = line;
    const B = [...fPoint, 24];
    const C = [...lPoint, 24];

    const vector = calVector(B, C, true);
    const p1 = movePoint(B, vector, 1, mDirect);
    const p2 = movePoint(C, vector, 1, mDirect);
    let segment2 = calLineSegment(p1, p2, 0.5, direct);
    createPolygon(props, {
      height: 0.5,
      nodes: [p1, p2, ...segment2],
      color: [201, 201, 201],
    });
  };

  return null;
}
