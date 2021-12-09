import { useEffect } from "react";
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  movePoint,
  renderSubPoints,
} from "../../utils/calculate";
import { POINT } from "../../constants/commons";
import { createPolygon } from "../../utils/util";

export default function Floors(props) {
  useEffect(() => {
    const { floors, foundation } = props;
    drawFloor([...foundation[0].nodes], 20);
    const data = [];
    const nodes = [];
    floors.forEach(({ polygon, center }, index) => {
      const points = polygon.split("").map((point) => ({
        point,
        node: POINT[point],
      }));

      points.forEach(({ point, node }) => {
        const vector = calVector(node, center, false);
        const p = movePoint(node, vector, 2.5, "ABFGH".includes(point));
        data.push({ point, node: p });
      });
    });

    for (const key in POINT) {
      const { node } = data.find((item) => item.point === key);
      nodes.push(node);
    }

    drawFloor([...nodes], 24.5);
    drawFloor([...nodes], 31.5);
    drawFloor([...nodes], 34);
  }, [props.view]);

  const drawFloor = (nodes, oz) => {
    if (oz === 34) {
      nodes.splice(5, 8);
    }
    const data = nodes.map((item) => {
      var node = [...item];
      node[2] = oz;
      return node;
    });
    // console.log(data);
    createPolygon({
      height: 0.1,
      nodes: data,
      color: "white",
    });
  };

  return null;
}
