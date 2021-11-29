import { useEffect } from 'react';
import { POINT } from '../../constants/commons';
import { calLineSegment, renderSubPoints } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Glasses(props) {
  useEffect(() => {
    (async () => {
      const { A, B } = POINT;
      var segment1 = calLineSegment(A, B, 3, true);
      var segment2 = calLineSegment(segment1[0], segment1[1], 3, true);

      createPolygon(props, {
        height: 25,
        nodes: [...segment1, ...segment2],
        color: 'red',
      });
    })();
  }, [props.view]);
  return null;
}
