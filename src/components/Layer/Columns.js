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
    columns.forEach((column) => handleData(column));
  }, [props.view]);

  const handleData = (column) => {
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
          const isBorder = index === 0 || index === subPoints.length - 1;

          const p = movePoint(point, vector, 0.5, i === 0);

          p[2] = isBorder ? 20 : 23.5;

          drawColumn(p, vector, 0.5, isBorder ? 14 : 10.5, direct);
        });
      } else {
        drawColumn(point, vector, 1, isLong ? 10.5 : 8, direct);
      }
    });
  };

  const drawColumn = (point, vector, distance, height, direct) => {
    const segment1 = calLineSegmentBaseVector(point, vector, distance, true);
    const segment2 = calLineSegment(segment1[0], segment1[1], 2, direct);
    const segment3 = calLineSegment(segment1[0], segment1[1], 2, !direct);

    createPolygon(props, {
      height,
      nodes: [...segment1, ...segment2],
      color: 'white',
    });
    createPolygon(props, {
      height,
      nodes: [...segment1, ...segment3],
      color: 'white',
    });
  };
  return null;
}
