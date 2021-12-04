import { loadModules } from "esri-loader";

/**
 * Divide 2 points to many points which distance are equal
 * numPart: number of part
 * @returns list of points
 */
export const createPolygon = async (view, data) => {
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
  view.graphics.add(polygonGraphic);
};
