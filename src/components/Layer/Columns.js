import { useEffect } from 'react';
import { POINT } from '../../constants/commons';
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  movePoint,
  renderSubPoints,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Columns(props) {
  useEffect(() => {
    const { columns } = props;
    columns.forEach((column) => drawColumn(column));
  }, [props.view]);

  const drawColumn = (column) => {
    const { segment, fPoint, lPoint, count, direct, isLong } = column;

    const subPoints = renderSubPoints(
      [...fPoint, 23.5],
      [...lPoint, 23.5],
      count
    );

    const vector = calVector(fPoint, lPoint, false);
    subPoints.forEach((point, index) => {
      if (segment === "A1'A2'") {
        [...Array(2)].forEach((item, i) => {
          const p = movePoint(point, vector, 0.5, i === 0);

          const isBorder = index === 0 || index === subPoints.length - 1;
          p[2] = isBorder ? 20 : 23.5;

          const segment1 = calLineSegmentBaseVector(p, vector, 0.5, true);
          const segment2 = calLineSegment(segment1[0], segment1[1], 2, false);

          createPolygon(props, {
            height: isBorder ? 14 : 11,
            nodes: [...segment1, ...segment2],
            color: 'white',
          });
        });
      } else {
        const segment1 = calLineSegmentBaseVector(point, vector, 1, true);
        const segment2 = calLineSegment(segment1[0], segment1[1], 2, direct);
        createPolygon(props, {
          height: isLong ? 10.5 : 8,
          nodes: [...segment1, ...segment2],
          color: 'white',
        });
      }
    });
  };
  return null;
}
