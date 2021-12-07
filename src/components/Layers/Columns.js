import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  movePoint,
  renderSubPoints,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Columns(props) {
  const { view } = useSelector((state) => state.commons);

  useEffect(() => {
    const { column, segment } = props;
    const { fPoint, lPoint, count, direct, isLong } = column;

    const subPoints = renderSubPoints(
      [...fPoint, 23.5],
      [...lPoint, 23.5],
      count
    );

    const vector = calVector(fPoint, lPoint, false);
    subPoints.forEach((point, index) => {
      if (segment === 'CD') {
        [...Array(2)].forEach((item, i) => {
          const isBorder = index === 0 || index === subPoints.length - 1;

          const p = movePoint(point, vector, 0.5, i === 0);

          p[2] = isBorder ? 20 : 23.5;

          drawColumn(p, vector, 0.5, isBorder ? 14 : 10.5, direct);
        });
      } else {
        if (
          !(segment === 'BC' && index === subPoints.length - 1) &&
          !(segment === 'DE' && index === 0)
        )
          drawColumn(point, vector, 1, isLong ? 10.5 : 8, direct);
      }
    });
  }, []);

  const drawColumn = (point, vector, distance, height, direct) => {
    const segment1 = calLineSegmentBaseVector(point, vector, distance, true);
    const segment2 = calLineSegment(segment1[0], segment1[1], 2, direct);
    const segment3 = calLineSegment(segment1[0], segment1[1], 2, !direct);

    createPolygon(view, {
      height,
      nodes: [...segment1, ...segment2],
      color: 'white',
    });
    createPolygon(view, {
      height,
      nodes: [...segment1, ...segment3],
      color: 'white',
    });
  };
  return null;
}
