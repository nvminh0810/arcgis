import React, { useEffect } from 'react';
import {
  calLineSegment,
  calLineSegmentBaseVector,
  calVector,
  renderSubPoints,
} from '../../utils/calculate';
import { createPolygon } from '../../utils/util';

export default function Pillars(props) {
  useEffect(() => {
    const { pillar } = props;
    pillar && drawPillar(pillar);
    return () => {};
  }, [props]);

  const drawPillar = (pillar) => {
    const { fPoint, lPoint, indexs, numPart, direct } = pillar;
    const vector = calVector(fPoint, lPoint);
    const subPoints = renderSubPoints(
      [...fPoint, 20],
      [...lPoint, 20],
      numPart
    );
    const pillars = subPoints.filter((point, index) => {
      return indexs.indexOf(index) !== -1;
    });

    pillars.map((pillar) => {
      const segment = calLineSegmentBaseVector(
        pillar,
        vector,
        1.5,
        true,
        direct
      );
      const segment2 = calLineSegment(segment[0], segment[1], 1, direct);
      const segment3 = calLineSegment(segment[1], segment[0], 3, !direct);
      createPolygon({
        nodes: [...segment2, ...segment3],
        height: 3.5,
        color: '#4b4a4a',
      });
    });
  };

  return null;
}
