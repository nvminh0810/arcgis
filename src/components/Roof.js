import React, { Fragment, useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";
import { calLineSegment } from "../utils/calculate";
import LineSurrounds from "./Layers/LineSurround";

export default function Roof() {
  const { roof } = useSelector((state) => state.commons);
  useEffect(() => {
    if (!roof) return;
    Object.keys(roof).map((subRoof) => {
      renderSubRoof(roof[subRoof]);
    });
    return () => {};
  }, [roof]);

  const renderSubRoof = (subRoof) => {
    const { nodes, baseRoof, l1Roof, l2Roof } = subRoof;
    [baseRoof, l1Roof, l2Roof].map((layer) => {
      layer && renderLayerRoof(layer, nodes);
    });
  };

  const renderLayerRoof = (layer, nodes) => {
    const { color, width, length, height, oz, isIndent } = layer;
    nodes = nodes.map((node) => [...node, oz]);

    const segment = calLineSegment(
      nodes[0],
      nodes[1],
      isIndent ? width - 20 : width,
      true
    );
    const segment2 = calLineSegment(nodes[2], nodes[3], width, false);

    const segment3 = calLineSegment(segment[0], segment2[1], length, false);
    const segment4 = calLineSegment(segment2[0], segment[1], length, true);

    createPolygon({
      nodes: [...segment3, ...segment4],
      color,
      height,
    });
  };

  return null;
}
