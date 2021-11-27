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

export const createPolygon = async (
  props,
  data,
  symbolSize,
  color = "gray",
  polygonType = "polygon",
  symbolType = "polygon-3d"
) => {
  const [Graphic] = await loadModules(["esri/Graphic"]);
  var polygon = {
    type: polygonType,
    rings: data,
  };

  let symbol = {
    type: symbolType,
    symbolLayers: [
      {
        type: "extrude",
        size: symbolSize,
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

export const createLine = async () => {};
