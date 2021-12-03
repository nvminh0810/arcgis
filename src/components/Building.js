import { Fragment, useEffect, useState } from "react";
import Roof from "./Roof";
import Foundation from "./Foundation";
import Stair from "./Stair";
import Floors from "./Layer/Floors";

import {
  getRoof,
  getFoundation,
  getStairs,
  getGlasses,
  getSideDoors,
  getFirstFloorWindows,
  getSecondFloorWindows,
  getLineBetweenFloors,
  getFloors,
  getColumns,
  getSubDoors,
  getSubWalls,
} from "../utils/api";
import Glasses from "./Layer/Glasses";
import FirstFloorWindows from "./Layer/FirstFloorWindows";
import SecondFloorWindows from "./Layer/SecondFloorWindows";
import SideDoors from "./Layer/SideDoors";
import LineBetweenFloors from "./Layer/LineBetweenFloors";
import Columns from "./Layer/Columns";
import SubDoor from "./Layer/SubDoor";
import SubWall from "./Layer/SubWall";

const Building = (props) => {
  const [roof, setRoof] = useState([]);
  const [foundation, setFoundation] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [windows, setWindows] = useState([]);
  const [sideDoors, setSideDoors] = useState([]);
  const [firstFloorWindows, setFirstFloorWindows] = useState([]);
  const [secondFloorWindows, setSecondFloorWindows] = useState([]);
  const [lineBetweenFloors, setLineBetweenFloors] = useState([]);
  const [floors, setFloors] = useState([]);
  const [columns, setColumns] = useState([]);
  const [stairs, setStairs] = useState([]);
  const [subDoors, setSubDoors] = useState([]);
  const [subWalls, setSubWalls] = useState([]);

  useEffect(() => {
    (async () => {
      const [
        roof,
        foundation,
        stairs,
        glasses,
        firstFloorWindows,
        secondFloorWindows,
        sideDoors,
        lineBetweenFloors,
        floors,
        columns,
        subDoors,
        subWalls,
      ] = await Promise.all([
        getRoof(),
        getFoundation(),
        getStairs(),
        getGlasses(),
        getFirstFloorWindows(),
        getSecondFloorWindows(),
        getSideDoors(),
        getLineBetweenFloors(),
        getFloors(),
        getColumns(),
        getSubDoors(),
        getSubWalls(),
      ]);
      setRoof(roof);
      setFoundation(foundation);
      setStairs(stairs);
      setGlasses(glasses);
      setFirstFloorWindows(firstFloorWindows);
      setSecondFloorWindows(secondFloorWindows);
      setSideDoors(sideDoors);
      setLineBetweenFloors(lineBetweenFloors);
      setFloors(floors);
      setColumns(columns);
      setSubDoors(subDoors);
      setSubWalls(subWalls);
    })();
    return () => {};
  }, []);

  return (
    <Fragment>
      {/* <Roof view={props.view} roof={roof} /> */}
      <Foundation view={props.view} foundation={foundation} />
      {glasses.length && <Glasses view={props.view} glasses={glasses} />}
      {firstFloorWindows.length && (
        <FirstFloorWindows view={props.view} windows={firstFloorWindows} />
      )}
      {secondFloorWindows.length && (
        <SecondFloorWindows view={props.view} windows={secondFloorWindows} />
      )}
      {sideDoors.length && (
        <SideDoors view={props.view} sideDoors={sideDoors} />
      )}
      {lineBetweenFloors.length && (
        <LineBetweenFloors
          view={props.view}
          lineBetweenFloors={lineBetweenFloors}
        />
      )}
      {floors.length && <Floors view={props.view} floors={floors} />}
      {columns.length && <Columns view={props.view} columns={columns} />}
      {subDoors.length && <SubDoor view={props.view} subDoors={subDoors} />}
      {subWalls.length && <SubWall view={props.view} subWalls={subWalls} />}
    </Fragment>
  );
};

export default Building;
