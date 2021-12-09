import React, { Fragment, useEffect, useState } from "react";
import { findLayerData } from "../../services/filterData";
import SubDoor from "./SubDoor";
import SubWall from "./SubWall";

export default function Layers(props) {
  const [subDoors, setSubDoors] = useState([]);
  const [subWalls, setSubWalls] = useState([]);

  useEffect(() => {
    const { layer } = props;
    const { subDoors, subWalls } = findLayerData(layer.id);
    setSubDoors(subDoors);
    setSubWalls(subWalls);
  }, [props]);

  const renderSubDoors = () => {
    if (!subDoors || subDoors.length <= 0) return;
    return subDoors.map((subDoor, index) => (
      <SubDoor subDoor={subDoor} key={index} />
    ));
  };
  const renderSubWalls = () => {
    if (!subWalls || subWalls.length <= 0) return;
    return subWalls.map((subWall) => <SubWall subDoor={subWall} />);
  };

  return <Fragment>{renderSubDoors()}</Fragment>;
}
