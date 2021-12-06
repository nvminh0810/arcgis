import React, { useEffect, useState } from "react";
import { POINT } from "../../constants/commons";
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  renderSubPoints,
} from "../../utils/calculate";
import { createPolygon } from "../../utils/util";

export default function SubWall(props) {
  useEffect(() => {
    const { subWalls } = props;
    subWalls.map((wall) => {
      drawSubWall(wall);
    });
    return () => {};
  }, [props]);

  const drawSubWall = (wall) => {
    const {
      fPoint,
      lPoint,
      numPart,
      indexs,
      height,
      color,
      direct,
      width,
      isIndent,
      wallDirect,
    } = wall;
    const vector = calVector(fPoint, lPoint);
    const subPoints = renderSubPoints(
      [...fPoint, 20],
      [...lPoint, 20],
      numPart
    );
    const subWall = subPoints.filter((point, index) => {
      return indexs.indexOf(index) !== -1;
    });
    subWall.map((point) => {
      const segment = calLineSegmentBaseVector(
        point,
        vector,
        isIndent ? 0.4 : 0.1,
        false,
        wallDirect
      );
      const segment2 = calLineSegment(segment[0], segment[1], width, direct);
      const segment3 = calLineSegment(segment2[0], segment2[1], width, direct);
      createPolygon(props, {
        nodes: isIndent
          ? [...segment2, ...segment3]
          : [...segment, ...segment2],
        height,
        color,
      });
    });
  };

  return <div></div>;
}
