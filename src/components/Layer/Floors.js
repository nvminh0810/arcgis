import { useEffect } from 'react';
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  movePoint,
  renderSubPoints,
} from '../../utils/calculate';
import { POINT } from '../../constants/commons';
import { createPolygon } from '../../utils/util';

export default function Floors(props) {
  useEffect(() => {
    const { floors } = props;
    const data = [];
    const nodes = [];

    floors.forEach(({ polygon, center }, index) => {
      const points = polygon.split('').map((point) => ({
        point,
        node: POINT[point],
      }));

      points.forEach(({ point, node }) => {
        const vector = calVector(node, center, false);
        const p = movePoint(node, vector, 2, 'ABFGH'.includes(point));
        data.push({ point, node: p });
      });
    });

    for (const key in POINT) {
      const { node } = data.find((item) => item.point === key);
      nodes.push(node);
    }

    drawFloor([...nodes], 20);
    drawFloor([...nodes], 24.5);
  }, [props.view]);

  const drawFloor = (nodes, oz) => {
    const data = nodes.map((item) => {
      var node = [...item];
      node[2] = oz;
      return node;
    });
    console.log(data);
    createPolygon(props, {
      height: 0.1,
      nodes: data,
      color: 'white',
    });
  };

  return null;
}
