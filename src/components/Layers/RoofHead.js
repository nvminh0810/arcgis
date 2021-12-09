import { useEffect } from "react";
import {
  calLineSegment,
  calVector,
  movePoint,
  renderSubPoints,
} from "../../utils/calculate";
import { createPolygon } from "../../utils/util";

export default function RoofHead(props) {
  const { roofHeads } = props;
  const leftPoints = [];
  const rightPoints = [];

  for (var key in roofHeads) {
    if ("R3R4R5R6".includes(key)) {
      rightPoints.push([...roofHeads[key], 34.5]);
    } else {
      leftPoints.push([...roofHeads[key], 34.5]);
    }
  }

  createPolygon({
    height: 0.5,
    nodes: leftPoints,
    color: "wheat",
  });
  createPolygon({
    height: 0.5,
    nodes: rightPoints,
    color: "wheat",
  });

  useEffect(() => {}, [props.view]);
  return null;
}
