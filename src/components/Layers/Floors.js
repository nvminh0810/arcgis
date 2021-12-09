import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { POINT } from '../../constants/constant_commons';
import { calLineSegment, calVector, movePoint } from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Floors() {
  const { floorBases } = useSelector((state) => state.commons);
  useEffect(() => {
    if (floorBases) {
      const nodes = [];
      const data = floorBases.map((floorBase) => handleData(floorBase));
      Object.keys(POINT).forEach((key) => {
        const seg = data.find((obj) => key in obj);
        seg && nodes.push(seg[key]);
      });
      drawFloor([...nodes], 20);
      drawFloor([...nodes], 24.5);
      drawFloor([...nodes], 31.5);
      drawFloor([...nodes], 34);
    }
  }, [floorBases]);

  const handleData = (floorBase) => {
    const { fPoint, lPoint, direct, shink, segment } = floorBase;
    const vector = calVector(fPoint, lPoint, false);

    const p1 = movePoint(fPoint, vector, 1, !shink);
    const p2 = movePoint(lPoint, vector, 1, shink);

    const seg = calLineSegment(p1, p2, 3, direct);
    const points = segment.split('');
    return { [points[0]]: seg[1], [points[1]]: seg[0] };
  };

  const drawFloor = (nodes, oz) => {
    if (oz === 34) {
      nodes.splice(5, 8);
    }
    const data = nodes.map((item) => {
      var node = [...item];
      node[2] = oz;
      return node;
    });
    createPolygon({
      height: 0.1,
      nodes: data,
      color: [179, 179, 179],
    });
  };

  return null;
}
