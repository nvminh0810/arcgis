import React, { useEffect } from "react";
import { findSurfaceData } from "../../services/filterData";
import Layers from "../Layers/Layers";

export default function Surfaces(props) {
  const { surface } = props;
  const renderLayers = () => {
    const layers = findSurfaceData(surface.id);
    if (!layers) return;
    return layers.map((layer, index) => (
      <Layers layer={layer} surface={surface} key={index} />
    ));
  };

  return <>{surface && renderLayers()}</>;
}
