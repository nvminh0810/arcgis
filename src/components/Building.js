import { Fragment, useEffect } from 'react';
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
} from '../services/api';
import { useDispatch } from 'react-redux';
import Floors from './Layers/Floors';

const Building = (props) => {
  const dispatch = useDispatch();
  const { view } = props;

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
    })();
    return () => {};
  }, []);

  return (
    <Fragment>
      <Foundation />
      <Block />
      <Floors />
    </Fragment>
  );
};

export default Building;
