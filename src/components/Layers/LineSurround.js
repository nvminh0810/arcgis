import React, { useEffect } from "react";
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  renderSubPoints,
} from "../../utils/calculate";
import { createPolygon } from "../../utils/util";

export default function LineSurround(props) {
  useEffect(() => {
    const { lineSurround } = props;
    lineSurround && drawlineSurround(lineSurround);
    return () => {};
  }, [props]);

  const drawlineSurround = (lineSurround) => {
    let { fPoint, lPoint, direct } = lineSurround;
    fPoint = [...fPoint, 20.2];
    lPoint = [...lPoint, 20.2];
    const segment = calLineSegment(fPoint, lPoint, 1, direct);
    createPolygon({
      nodes: [...segment, fPoint, lPoint],
      height: 0.5,
      color: "gray",
    });
  };

  return null;
}
