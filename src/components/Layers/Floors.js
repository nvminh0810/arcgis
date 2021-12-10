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
      const fNodes = [];

      const data1 = floorBases.map((floorBase) => handleData(floorBase, false));
      const data2 = floorBases.map((floorBase) => handleData(floorBase, true));

      Object.keys(POINT).forEach((key) => {
        const seg1 = data1.find((obj) => key in obj);
        seg1 && nodes.push(seg1[key]);
        const seg2 = data2.find((obj) => key in obj);
        seg2 && fNodes.push(seg2[key]);
      });

      drawFloor([...fNodes], 20);
      drawFloor([...nodes], 24.5);
      drawFloor([...nodes], 31.5);
      drawFloor([...nodes], 34);
    }
  }, [floorBases]);

  const handleData = (floorBase, isFoundation) => {
    const { fPoint, lPoint, direct, shink, segment } = floorBase;
    const vector = calVector(fPoint, lPoint, false);
    let p1 = [];
    let p2 = [];
    let seg = [];

    if (!isFoundation) {
      p1 = movePoint(fPoint, vector, 1, !shink);
      p2 = movePoint(lPoint, vector, 1, shink);
      seg = calLineSegment(p1, p2, 3, direct);
    } else {
      p1 = movePoint(fPoint, vector, 3, shink);
      p2 = movePoint(lPoint, vector, 3, !shink);
      seg = calLineSegment(p1, p2, 6, !direct);
    }

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
      height: 0.25,
      nodes: data,
      color: [179, 179, 179],
    });
  };

  return null;
}
