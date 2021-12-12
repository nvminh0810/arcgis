import { useEffect } from 'react';
import { createPolygon } from '../utils/util';
import { POINT } from '../constants/constant_commons';
import { calLineSegment } from '../utils/calculate';
import { useSelector } from 'react-redux';

export default function Stair() {
  const { stairs } = useSelector((state) => state.commons);
  useEffect(() => {
    stairs?.forEach((stair) => drawStair(stair));
  }, [stairs]);
  const drawStair = ({ fPoint, lPoint, direct, segment }) => {
    const p1 = [...fPoint, 15];
    const p2 = [...lPoint, 15];

    let height = 5.2;
    let distance = 2.25;
    let count = 0;
    let max = segment === 'CD' ? 20 : 5;
    while (height >= 0) {
      const sg = calLineSegment(p1, p2, distance, direct);
      createPolygon({
        height,
        nodes: [p1, p2, ...sg],
        color: 'wheat',
      });
      if (count < max && (height === 5.2 || height === 2.7)) {
        count++;
        height += 0.25;
      }
      if (count === max) {
        max = 10;
        count = 0;
        height -= 0.25;
      }
      height -= 0.25;
      distance += 2.25;
    }
  };
  return null;
}
