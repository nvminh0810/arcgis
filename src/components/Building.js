import { Fragment, useEffect, useState } from 'react';

import {
  getFoundation,
  getGlasses,
  getSideDoors,
  getFirstFloorWindows,
  getSecondFloorWindows,
  getLineBetweenFloors,
  getFloors,
  getColumns,
  getSubDoors,
  getSubWalls,
  getRoofWindows,
  getRoofHeads,
} from '../utils/api';
import Foundation from './Foundation';
import Floors from './Layer/Floors';
import BackDoor from './Layer/BackDoor';
import RoofHead from './Layer/RoofHead';
import Glasses from './Layer/Glasses';
import FirstFloorWindows from './Layer/FirstFloorWindows';
import SecondFloorWindows from './Layer/SecondFloorWindows';
import SideDoors from './Layer/SideDoors';
import LineBetweenFloors from './Layer/LineBetweenFloors';
import Columns from './Layer/Columns';
import SubDoor from './Layer/SubDoor';
import SubWall from './Layer/SubWall';
import RoofWindows from './Layer/roofWindows';

const Building = (props) => {
  const [foundation, setFoundation] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [sideDoors, setSideDoors] = useState([]);
  const [firstFloorWindows, setFirstFloorWindows] = useState([]);
  const [secondFloorWindows, setSecondFloorWindows] = useState([]);
  const [lineBetweenFloors, setLineBetweenFloors] = useState([]);
  const [floors, setFloors] = useState([]);
  const [columns, setColumns] = useState([]);
  const [roofWindows, setRoofWindows] = useState([]);
  const [roofHeads, setRoofHeads] = useState(null);
  const [subDoors, setSubDoors] = useState([]);
  const [subWalls, setSubWalls] = useState([]);

  useEffect(() => {
    (async () => {
      const [
        foundation,
        glasses,
        firstFloorWindows,
        secondFloorWindows,
        sideDoors,
        lineBetweenFloors,
        floors,
        columns,
        subDoors,
        subWalls,
        roofWindows,
        roofHeads,
      ] = await Promise.all([
        getFoundation(),
        getGlasses(),
        getFirstFloorWindows(),
        getSecondFloorWindows(),
        getSideDoors(),
        getLineBetweenFloors(),
        getFloors(),
        getColumns(),
        getSubDoors(),
        getSubWalls(),
        getRoofWindows(),
        getRoofHeads(),
      ]);
      setFoundation(foundation);
      setGlasses(glasses);
      setFirstFloorWindows(firstFloorWindows);
      setSecondFloorWindows(secondFloorWindows);
      setSideDoors(sideDoors);
      setLineBetweenFloors(lineBetweenFloors);
      setFloors(floors);
      setColumns(columns);
      setSubDoors(subDoors);
      setSubWalls(subWalls);
      setRoofWindows(roofWindows);
      setRoofHeads(roofHeads);
    })();
    return () => {};
  }, []);

  return (
    <Fragment>
      {foundation.length && (
        <Foundation view={props.view} foundation={foundation} />
      )}
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
      {floors.length && (
        <Floors view={props.view} floors={floors} foundation={foundation} />
      )}
      {columns.length && <Columns view={props.view} columns={columns} />}
      {subDoors.length && <SubDoor view={props.view} subDoors={subDoors} />}
      {subWalls.length && <SubWall view={props.view} subWalls={subWalls} />}
      {roofWindows.length && (
        <RoofWindows view={props.view} roofWindows={roofWindows} />
      )}
      <BackDoor view={props.view} />
      {roofHeads && <RoofHead view={props.view} roofHeads={roofHeads} />}
    </Fragment>
  );
};

export default Building;
