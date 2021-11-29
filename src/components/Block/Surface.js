import React, { Fragment, useEffect, useState } from 'react';
import Layer from '../Layer/Layer';

export default function Surface(props) {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    // console.log(props.surface);
    return () => {};
  }, [props.surface]);

  const renderLayers = (layers) => {
    if (layers.length > 0) {
      return layers.map((layer, index) => {
        return <Layer key={index} data={layer} />;
      });
    }
  };
  return <Fragment>{renderLayers(layers)}</Fragment>;
}
