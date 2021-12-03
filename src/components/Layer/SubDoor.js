import React, { useEffect, useState } from "react";
import { POINT } from "../../constants/commons";
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  moveMultiplePoint,
  renderSubPoints,
} from "../../utils/calculate";
import { createPolygon } from "../../utils/util";

export default function SubDoor(props) {
  useEffect(() => {
    const { subDoors } = props;
    subDoors.map((door) => {
      drawSubDoor(door);
    });
    return () => {};
  }, [props]);

  const drawSubDoor = (door) => {
    const {
      fPoint,
      lPoint,
      indexs,
      width,
      height,
      direct,
      color,
      numPart,
      isMiddle,
      expand,
    } = door;
    const vector = calVector(fPoint, lPoint);
    const subPoints = renderSubPoints(
      [...fPoint, 20],
      [...lPoint, 20],
      numPart
    );
    const subDoor = subPoints.filter((point, index) => {
      return indexs.indexOf(index) !== -1;
    });

    subDoor.map((point, index) => {
      let newPoint = null;
      if (index === 0 || index === subDoor.length - 1) {
        if (!expand) {
          newPoint = calLineSegmentBaseVector(
            point,
            vector,
            0.4,
            false,
            index % 2 !== 0 ? true : false
          );
        }
      }
      const segmentInfo = calLineSegmentBaseVector(
        newPoint ? newPoint[1] : point,
        vector,
        isMiddle ? width : width / 2,
        isMiddle,
        isMiddle ? false : index % 2 === 0 ? true : false
      );
      const segment2 = calLineSegment(
        segmentInfo[0],
        segmentInfo[1],
        30,
        direct
      );
      const segment3 = calLineSegment(segment2[0], segment2[1], 1, !direct);

      const data = moveMultiplePoint(
        [...segment2, ...segment3],
        vector,
        width,
        index !== 0
      );
      createPolygon(props, {
        nodes:
          expand && (index == 0 || index == subDoor.length - 1)
            ? [...data, ...segment2, ...segment3]
            : [...segment2, ...segment3],
        height,
        color,
      });
    });
  };

  return null;
}
