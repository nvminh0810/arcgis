import React, { Fragment, useEffect, useState } from 'react';
import { findLayerData } from '../../services/filterData';
import Columns from './Columns';
import Glasses from './Glasses';
import Lines from './Lines';
import SubDoor from './SubDoor';
import SubWall from './SubWall';

export default function Layers(props) {
  const [glasses, setGlasses] = useState([]);
  const [columns, setColumns] = useState([]);
  const [lines, setLines] = useState([]);
  const [subDoors, setSubDoors] = useState([]);
  const [subWalls, setSubWalls] = useState([]);

  const { layer, segment } = props;
  const { idFloor } = layer;
  useEffect(() => {
    const { subDoors, subWalls, glasses, columns, lines } = findLayerData(
      layer.id
    );
    setSubDoors(subDoors);
    setGlasses(glasses);
    setColumns(columns);
    setLines(lines);
  }, []);

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

  const renderGlasses = () => {
    if (!glasses || glasses.length <= 0) return;
    return glasses.map((glass) => (
      <Glasses glass={glass} floor={idFloor} segment={segment} />
    ));
  };

  const renderColumns = () => {
    if (!columns || columns.length <= 0) return;
    return columns.map((column) => (
      <Columns column={column} segment={segment} />
    ));
  };

  const renderLines = () => {
    if (!lines || lines.length <= 0) return;
    return lines.map((line) => <Lines line={line} segment={segment} />);
  };

  return (
    <>{[renderSubDoors(), renderGlasses(), renderColumns(), renderLines()]}</>
  );
}
