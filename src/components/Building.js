import { useEffect } from 'react';
import Foundation from './Foundation';
import Block from './Blocks/Block';

import {
  setFoundation,
  setBlocks,
  setView,
  setWindows,
  setSurfaces,
  setLayers,
  setGlasses,
  setLines,
  setColumns,
  setSubWalls,
  setSubDoors,
  setFloorBases,
  setPillars,
  setLineSurrounds,
  setRoofWindows,
  setRoof,
  setDoors,
  setStairs,
} from '../actions/action_commons';
import {
  getFoundation,
  getBlocks,
  getWindows,
  getSurfaces,
  getLayers,
  getGlasses,
  getColumns,
  getLines,
  getSubDoors,
  getSubWalls,
  getFloorBases,
  getPillars,
  getLineSurrounds,
  getRoofWindows,
  getRoof,
  getDoors,
  getStairs,
} from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import Floors from './Layers/Floors';
import BackDoor from './Layers/BackDoor';
import MainDoor from './Layers/MainDoor';
import Roof from './Roof';
import RoofWindows from './Layers/roofWindows';
import Stair from './Stair';
import BehindRoof from './BehindRoof';

const Building = (props) => {
  const dispatch = useDispatch();
  const { view } = props;
  const { view: v } = useSelector((state) => state.commons);

  useEffect(() => {
    (async () => {
      const [
        foundation,
        blocks,
        floorBases,
        surfaces,
        layers,
        windows,
        glasses,
        lines,
        columns,
        subDoors,
        subWalls,
        pillars,
        lineSurrounds,
        roofWindows,
        roof,
        doors,
        stairs,
      ] = await Promise.all([
        getFoundation(),
        getBlocks(),
        getFloorBases(),
        getSurfaces(),
        getLayers(),
        getWindows(),
        getGlasses(),
        getLines(),
        getColumns(),
        getSubDoors(),
        getSubWalls(),
        getPillars(),
        getLineSurrounds(),
        getRoofWindows(),
        getRoof(),
        getDoors(),
        getStairs(),
      ]);
      dispatch(setView({ view }));
      dispatch(setFoundation({ foundation }));
      dispatch(setBlocks({ blocks }));
      dispatch(setFloorBases({ floorBases }));
      dispatch(setSurfaces({ surfaces }));
      dispatch(setLayers({ layers }));
      dispatch(setWindows({ windows }));
      dispatch(setGlasses({ glasses }));
      dispatch(setLines({ lines }));
      dispatch(setColumns({ columns }));
      dispatch(setSubDoors({ subDoors }));
      dispatch(setSubWalls({ subWalls }));
      dispatch(setPillars({ pillars }));
      dispatch(setLineSurrounds({ lineSurrounds }));
      dispatch(setRoofWindows({ roofWindows }));
      dispatch(setRoof({ roof }));
      dispatch(setDoors({ doors }));
      dispatch(setStairs({ stairs }));
    })();
    return () => {};
  }, []);

  const render = () => {
    if (v) {
      return (
        <>
          <Foundation />
          <Block />
          <Floors />
          <BackDoor />
          <MainDoor />
          <RoofWindows />
          <Roof />
          <BehindRoof />
          <Stair />
        </>
      );
    } else console.log('fail');
  };

  return <>{render()}</>;
};

export default Building;
