import { Fragment, useEffect, useState } from 'react';
import Block from './Block/Block';
import Roof from './Roof';
import Foundation from './Foundation';
import Stair from './Stair';
import Window from './Layer/Window';

import {
  getBlocks,
  getRoof,
  getFoundation,
  getStairs,
  getGlasses,
  getWindows,
  getSideDoors,
  getFirstFloorWindows,
  getSecondFloorWindows,
  getLineBetweenFloors,
} from '../utils/api';
import Glasses from './Layer/Glasses';
import FirstFloorWindows from './Layer/FirstFloorWindows';
import SecondFloorWindows from './Layer/SecondFloorWindows';
import SideDoors from './Layer/SideDoors';
import LineBetweenFloors from './Layer/LineBetweenFloors';

const Building = (props) => {
  const [blocks, setBlocks] = useState([]);
  const [roof, setRoof] = useState([]);
  const [foundation, setFoundation] = useState([]);
  const [glasses, setGlasses] = useState([]);
  const [windows, setWindows] = useState([]);
  const [sideDoors, setSideDoors] = useState([]);
  const [firstFloorWindows, setFirstFloorWindows] = useState([]);
  const [secondFloorWindows, setSecondFloorWindows] = useState([]);
  const [lineBetweenFloors, setLineBetweenFloors] = useState([]);

  const [stairs, setStairs] = useState([]);

  useEffect(() => {
    (async () => {
      const [
        blocks,
        roof,
        foundation,
        stairs,
        glasses,
        firstFloorWindows,
        secondFloorWindows,
        sideDoors,
        lineBetweenFloors,
      ] = await Promise.all([
        getBlocks(),
        getRoof(),
        getFoundation(),
        getStairs(),
        getGlasses(),
        getFirstFloorWindows(),
        getSecondFloorWindows(),
        getSideDoors(),
        getLineBetweenFloors(),
      ]);
      setBlocks(blocks);
      setRoof(roof);
      setFoundation(foundation);
      setStairs(stairs);
      setGlasses(glasses);
      setFirstFloorWindows(firstFloorWindows);
      setSecondFloorWindows(secondFloorWindows);
      setSideDoors(sideDoors);
      setLineBetweenFloors(lineBetweenFloors);
    })();
    return () => {};
  }, []);

  const renderBlocks = (blocks) => {
    if (blocks.length > 0) {
      return blocks.map((block, index) => {
        return <Block key={index} block={block} />;
      });
    }
  };

  return (
    <Fragment>
      {/* <Roof view={props.view} roof={roof} /> */}
      {/* {renderBlocks(blocks)} */}
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

      {/* <Stair view={props.view} stairs={stairs} /> */}
      <Window view={props.view} />
    </Fragment>
  );
};

export default Building;
