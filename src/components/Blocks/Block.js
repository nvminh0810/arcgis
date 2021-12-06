import React from 'react';
import { useSelector } from 'react-redux';
import Surfaces from '../Surfaces/Surfaces';

export default function Block() {
  const { blocks, surfaces } = useSelector((state) => state.commons);

  const renderSurfaces = () => {
    return blocks.map((block, index) => {
      const surfacesFilter = surfaces.filter(
        (surface) => surface.idBlock === block.id
      );

      return surfacesFilter.map((surface, i) => (
        <Surfaces surface={surface} key={(index + 1) * (i + 1)} />
      ));
    });
  };

  return <>{blocks && surfaces && renderSurfaces()}</>;
}
