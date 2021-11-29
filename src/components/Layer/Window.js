import { useEffect } from 'react';
import { createPolygon } from '../../utils/util';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { POINT } from '../../constants/commons';

export default function Window(props) {
  useEffect(() => {
    (async () => {
      const subPoints = renderSubPoints(
        [...POINT['A'], 20],
        [...POINT['B'], 20],
        21
      );
      const segment1 = calLineSegment(subPoints[3], subPoints[9], 3, true);
      const segment2 = calLineSegment(subPoints[12], subPoints[18], 3, true);

      createPolygon(props, {
        height: 1,
        nodes: [subPoints[3], subPoints[9], ...segment1],
        color: 'gray',
      });
      createPolygon(props, {
        height: 1,
        nodes: [subPoints[12], subPoints[18], ...segment2],
        color: 'gray',
      });
      // lines.forEach((item) => {
      //   createPolygon(props, item);
      // });
    })();
    return () => {};
  }, [props.view]);
  return null;
}
