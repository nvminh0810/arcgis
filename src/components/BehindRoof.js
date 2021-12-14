import { useEffect } from 'react';
import { createPolygon } from '../utils/util';
import { calLineSegment, calVector, movePoint } from '../utils/calculate';
import { useSelector } from 'react-redux';
export default function BehindRoof() {
  const { roof } = useSelector((state) => state.commons);

  useEffect(() => {
    if (roof) {
      const { baseRoof } = roof.behindRoof;
      drawBaseRoof(baseRoof, 31.5, 0.25, 'white', true);
      drawLayerRoof(baseRoof, 31.5, 0.5, '#dfc186', false);
    }
  }, [roof]);

  const drawBaseRoof = (baseRoof, oz, height, color, isBase) => {
    const data = baseRoof.map((item) => handleData(item, isBase));
    const nodes = 'LMNORSTU'.split('').map((key) => {
      const seg = data.find((obj) => key in obj);
      if (seg) return seg[key];
      return null;
    });
    drawPolygon(nodes, oz, height, color);
  };

  const drawLayerRoof = (baseRoof, oz, height, color, isBase) => {
    const data = baseRoof.map((item) => handleData(item, isBase));
    const nodes = 'LMNORSTU'.split('').map((key) => {
      const seg = data.find((obj) => key in obj);
      if (seg) return seg[key];
      return null;
    });
    drawPolygon(nodes, oz, height, color);
  };

  const handleData = (floorBase, isBase) => {
    const { fPoint, lPoint, direct, shink, segment } = floorBase;
    const vector = calVector(fPoint, lPoint, false);
    let p1 = [];
    let p2 = [];
    let seg = [];

    p1 = movePoint(fPoint, vector, 1, shink);
    p2 = movePoint(lPoint, vector, 1, !shink);
    seg = calLineSegment(p1, p2, 6, isBase ? !direct : direct);

    let points = segment.split('');
    return { [points[0]]: seg[1], [points[1]]: seg[0] };
  };

  const drawPolygon = (nodes, oz, height, color) => {
    createPolygon({
      nodes: nodes.map((item) => {
        item[2] = oz;
        return item;
      }),
      color,
      height,
    });
  };

  return null;
}
