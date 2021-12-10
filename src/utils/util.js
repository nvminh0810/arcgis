import { loadModules } from 'esri-loader';
import { store } from '../store/index';

/**
 * Divide 2 points to many points which distance are equal
 * numPart: number of part
 * @returns list of points
 */
export const createPolygon = async (data) => {
  const { view } = store.getState().commons;
  const [Graphic] = await loadModules(['esri/Graphic']);
  const { nodes, color, height } = data;
  var polygon = {
    type: 'polygon',
    rings: nodes,
  };

  let symbol = {
    type: 'polygon-3d',
    symbolLayers: [
      {
        type: 'extrude',
        size: height,
        material: { color },
      },
    ],
  };
  var polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: symbol,
  });
  view.graphics.add(polygonGraphic);
};

export const createLine = async (data) => {
  const { view } = store.getState().commons;

  const [Graphic, Polyline] = await loadModules([
    'esri/Graphic',
    'esri/geometry/Polyline',
  ]);
  const { paths, color, height } = data;
  let line = new Polyline({
    paths: [paths],
  });

  const symbol = {
    type: 'line-3d',
    symbolLayers: [
      {
        type: 'line',
        size: 5,
        material: { color: 'black' },
        cap: 'round',
        join: 'round',
      },
    ],
  };
  var lineGraphic = new Graphic({
    geometry: line,
    symbol: symbol,
  });
  view.graphics.add(lineGraphic);
};
