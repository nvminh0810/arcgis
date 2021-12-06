import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layers from '../Layers/Layers';
export default function Surfaces({ surface }) {
  const { layers } = useSelector((state) => state.commons);
  const [layersFilter, setLayersFilter] = useState([]);

  useEffect(() => {
    layers &&
      setLayersFilter(layers.filter((layer) => layer.id === surface.id));
  }, [layers]);

  const rederLayers = () => {
    return layersFilter.map((layer, index) => (
      <Layers layer={layer} segment={surface.segment} key={index} />
    ));
  };

  return <>{layersFilter.length && rederLayers()}</>;
}
