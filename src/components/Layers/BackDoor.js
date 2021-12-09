import { useEffect } from "react";
import { calLineSegment, renderSubPoints } from "../../utils/calculate";
import { createPolygon } from "../../utils/util";

const I1 = [106.69510210348398, 10.776606795826826];
const I2 = [106.69500241578363, 10.776697858851977];

export default function BackDoor(props) {
  useEffect(() => {
    drawBackDoor([...I1], [...I2], 15, 5, 50);
    drawBackDoor([...I1], [...I2], 23.5, 0.5, 50);
    drawBackDoor([...I1], [...I2], 24.5, 0.6, 30);

    const subPoints = renderSubPoints(I1, I2, 9);
    const sI1 = subPoints[1];
    const sI2 = subPoints[8];

    drawBackDoor([...I1], [...sI1], 25.2, 0.5, 30);
    drawBackDoor([...I2], [...sI2], 25.2, 0.5, 30);

    const segement = calLineSegment(I1, I2, 20, true);
    drawBackDoor([...segement[1]], [...segement[0]], 25.2, 0.5, 10);
  }, [props.view]);

  const drawBackDoor = (p1, p2, oz, height, distace) => {
    p1[2] = oz;
    p2[2] = oz;
    const segment2 = calLineSegment(p1, p2, distace, true);

    createPolygon({
      height,
      nodes: [p1, p2, ...segment2],
      color: "wheat",
    });
  };

  return null;
}
