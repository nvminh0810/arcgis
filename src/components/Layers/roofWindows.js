import { useEffect } from "react";
import {
  calLineSegment,
  calVector,
  movePoint,
  calLineSegmentBaseVector,
} from "../../utils/calculate";
import { createPolygon } from "../../utils/util";

export default function RoofWindows(props) {
  useEffect(() => {
    props.roofWindows.forEach((roofWindow) => {
      drawRoofWindow(roofWindow);
    });
  }, [props.view]);

  const drawRoofWindow = (roofWindow) => {
    const { fPoint, lPoint, direct, mDirect, check } = roofWindow;
    fPoint[2] = 31.5;
    lPoint[2] = 31.5;

    const vector = calVector(fPoint, lPoint, true);
    const p1 = movePoint(fPoint, vector, 1, mDirect);
    const p2 = movePoint(lPoint, vector, 1, mDirect);

    const segment = calLineSegment(p1, p2, 2.25, direct);
    createPolygon({
      height: 1,
      nodes: [p1, p2, ...segment],
      color: "gray",
    });
    drawPolygon(p1, segment[1], check, !mDirect);
    drawPolygon(p2, segment[0], check, mDirect);
  };

  const drawPolygon = (p1, p2, check, mDirect) => {
    const segment = calLineSegment(p1, p2, 8, check ? mDirect : !mDirect);
    createPolygon({
      height: 2.5,
      nodes: [p2, p2, ...segment],
      color: "gray",
    });
  };

  return null;
}
