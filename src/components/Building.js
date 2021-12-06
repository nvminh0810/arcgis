import { Fragment, useEffect } from 'react';
import Foundation from './Foundation';
import Block from './Blocks/Block';
import Stair from './Stair';
import Roof from './Roof';
import {
  setFoundation,
  setBlocks,
  setStairs,
  setRoof,
  setView,
} from '../actions/action_commons';
import { getFoundation, getRoof, getBlocks, getStairs } from '../utils/api';
import { useDispatch } from 'react-redux';

const Building = (props) => {
  const dispatch = useDispatch();
  const { view } = props;
  useEffect(() => {
    (async () => {
      const [foundation, blocks, stairs, roof] = await Promise.all([
        getFoundation(),
        getBlocks(),
        getStairs(),
        getRoof(),
      ]);
      dispatch(setView({ view }));
      dispatch(setFoundation({ foundation }));
      dispatch(setBlocks({ blocks }));
      dispatch(setStairs({ stairs }));
      dispatch(setRoof({ roof }));
    })();
    return () => {};
  }, []);

  return (
    <Fragment>
      <Foundation />
      <Block />
      {/* <Stair /> */}
      {/* <Roof /> */}
    </Fragment>
  );
};

export default Building;
