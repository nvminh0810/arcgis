import { loadModules } from "esri-loader";
/**
 * Divide 2 points to many points which distance are equal
 * numPart: number of part
 * @returns list of points
 */
export const renderSubPoints = (startPoint, endPoint, numPart) => {
  let subPoints = [];
  let dx = (endPoint[0] - startPoint[0]) / numPart;
  let dy = (endPoint[1] - startPoint[1]) / numPart;
  for (let i = 1; i < numPart; i++)
    subPoints.push([
      startPoint[0] + i * dx,
      startPoint[1] + i * dy,
      startPoint[2],
    ]);
  return [startPoint, ...subPoints, endPoint];
};

export const createPolygon = async (props, data) => {
  const [Graphic] = await loadModules(["esri/Graphic"]);
  const { nodes, color, height } = data;
  var polygon = {
    type: "polygon",
    rings: nodes,
  };

  let symbol = {
    type: "polygon-3d",
    symbolLayers: [
      {
        type: "extrude",
        size: height,
        material: { color },
      },
    ],
  };
  var polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: symbol,
  });
  props.view.graphics.add(polygonGraphic);
};

export const createLine = async (props, data) => {
  const [Graphic, Polyline] = await loadModules([
    "esri/Graphic",
    "esri/geometry/Polyline",
  ]);
  const { paths, color, height } = data;
  let line = new Polyline({
    paths: [paths],
  });

  const symbol = {
    type: "line-3d",
    symbolLayers: [
      {
        type: "line",
        size: 5,
        material: { color: "black" },
        cap: "round",
        join: "round",
      },
    ],
  };
  var lineGraphic = new Graphic({
    geometry: line,
    symbol: symbol,
  });
  props.view.graphics.add(lineGraphic);
};
