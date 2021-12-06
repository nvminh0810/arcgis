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
} from '../actions/action_commons';
import {
  getFoundation,
  getBlocks,
  getWindows,
  getSurfaces,
  getLayers,
} from '../utils/api';
import { useDispatch } from 'react-redux';

const Building = (props) => {
  const dispatch = useDispatch();
  const { view } = props;

  useEffect(() => {
    (async () => {
      const [foundation, blocks, surfaces, layers, windows] = await Promise.all(
        [getFoundation(), getBlocks(), getSurfaces(), getLayers(), getWindows()]
      );
      dispatch(setView({ view }));
      dispatch(setFoundation({ foundation }));
      dispatch(setBlocks({ blocks }));
      dispatch(setSurfaces({ surfaces }));
      dispatch(setLayers({ layers }));
      dispatch(setWindows({ windows }));
    })();
    return () => {};
  }, []);

  return (
    <Fragment>
      <Foundation />
      <Block />
    </Fragment>
  );
};

export default Building;
