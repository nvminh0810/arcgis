import React, {useEffect, useState } from 'react';
import { findLayerData } from '../../services/filterData';
import Columns from './Columns';
import FirstFloorWindows from './FirstFloorWindows';
import Glasses from './Glasses';
import Lines from './Lines';
import SecondFloorWindows from './SecondFloorWindows';
import SubDoor from './SubDoor';
import SubWall from './SubWall';

export default function Layers(props) {
  const [glasses, setGlasses] = useState([]);
  const [columns, setColumns] = useState([]);
  const [lines, setLines] = useState([]);
  const [subDoors, setSubDoors] = useState([]);
  const [subWalls, setSubWalls] = useState([]);
  const [windows, setWindows] = useState([]);

  const { layer, surface } = props;
  const { segment, fPoint, lPoint } = surface;
  const { id, idFloor } = layer;

  useEffect(() => {
    const { subDoors, subWalls, glasses, columns, lines, windows } =
      findLayerData(id);
    setSubDoors(subDoors);
    setSubWalls(subWalls);
    setGlasses(glasses);
    setColumns(columns);
    setLines(lines);
    setWindows(windows);
  }, [props]);

  const renderSubDoors = () => {
    if (!subDoors || subDoors.length <= 0) return;
    return subDoors.map((subDoor, index) => {
      subDoor = { ...subDoor, fPoint, lPoint };
      return <SubDoor subDoor={subDoor} key={index} />;
    });
  };
  const renderSubWalls = () => {
    if (!subWalls || subWalls.length <= 0) return;
    return subWalls.map((subWall, index) => {
      subWall = { ...subWall, fPoint, lPoint };
      return <SubWall subWall={subWall} key={index} />;
    });
  };

  const renderGlasses = () => {
    if (!glasses || glasses.length <= 0) return;
    return glasses.map((glass) => (
      <Glasses
        glass={{ ...glass, fPoint, lPoint }}
        floor={idFloor}
        segment={segment}
      />
    ));
  };

  const renderColumns = () => {
    if (!columns || columns.length <= 0) return;
    return columns.map((column) => (
      <Columns column={{ ...column, fPoint, lPoint }} segment={segment} />
    ));
  };

  const renderLines = () => {
    if (!lines || lines.length <= 0) return;
    return lines.map((line) => (
      <Lines line={{ ...line, fPoint, lPoint }} segment={segment} />
    ));
  };

  const renderWindows = () => {
    if (!windows || windows.length <= 0) return;
    return windows.map((window) =>
      idFloor === 1 ? (
        <FirstFloorWindows
          window={{ ...window, fPoint, lPoint }}
          segment={segment}
        />
      ) : (
        <SecondFloorWindows
          window={{ ...window, fPoint, lPoint }}
          segment={segment}
        />
      )
    );
  };

  return (
    <>
      {[
        renderSubDoors(),
        renderGlasses(),
        renderColumns(),
        renderLines(),
        renderWindows(),
        renderSubWalls(),
      ]}
    </>
  );
}
