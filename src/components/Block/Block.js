import React, { Fragment, useState, useEffect } from 'react';
import Surface from './Surface';
import Door from './Door';

export default function Block(props) {
  const [surfaces, setsurfaces] = useState([]);
  const [layers, setLayers] = useState([]);

  const renderSurfaces = (surfaces) => {
    if (surfaces.length > 0) {
      return surfaces.map((surface, index) => {
        return <Surface key={index} surface={surface} />;
      });
    }
  };

  return (
    <Fragment>
      <Door />
      {/* {renderSurfaces(surfaces)} */}
    </Fragment>
  );
}
