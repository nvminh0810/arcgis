import { Fragment, useEffect, useState } from "react";
import Block from "./Block/Block";
import Roof from "./Roof";
import Foundation from "./Foundation";
import Stair from "./Stair";
import Window from "./Layer/Window";
import { getBlocks, getRoof, getFoundation, getStairs } from "../utils/api";

const Building = (props) => {
  const [blocks, setBlocks] = useState([]);
  const [roof, setRoof] = useState([]);
  const [foundation, setFoundation] = useState([]);
  const [stairs, setStairs] = useState([]);

  useEffect(() => {
    (async () => {
      const [blocks, roof, foundation, stairs] = await Promise.all([
        getBlocks(),
        getRoof(),
        getFoundation(),
        getStairs(),
      ]);
      setBlocks(blocks);
      setRoof(roof);
      setFoundation(foundation);
      setStairs(stairs);
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
      {/* <Stair view={props.view} stairs={stairs} /> */}
      <Window view={props.view} />
    </Fragment>
  );
};

export default Building;
