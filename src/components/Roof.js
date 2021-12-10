import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";
import { calLineSegment } from "../utils/calculate";

export default function Roof() {
  const { roof } = useSelector((state) => state.commons);
  useEffect(() => {
    if (roof) {
      const { frontRoof, centerRoof, behindRoof } = roof;
      renderFrontRoof(frontRoof);
    }
    return () => {};
  }, [roof]);

  const renderFrontRoof = (frontRoof) => {
    const { nodes, baseRoof, l1Roof, l2Roof } = frontRoof;
    [baseRoof, l1Roof, l2Roof].map((layer) => {
      renderLayerRoof(layer, nodes);
    });
  };

  const renderLayerRoof = (layer, nodes) => {
    const { color, width, length, height, oz } = layer;
    nodes = nodes.map((node) => [...node, oz]);

    const segment = calLineSegment(nodes[0], nodes[1], width - 20, true);
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
