import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Surfaces from "../Surfaces/Surfaces";

export default function Block() {
  const { surfaces } = useSelector((state) => state.commons);

  const renderSurfaces = () => {
    return surfaces.map((surface, index) => (
      <Surfaces surface={surface} key={index} />
    ));
  };

  return <>{surfaces && surfaces.length && renderSurfaces()}</>;
}
