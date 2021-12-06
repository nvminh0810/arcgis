import * as Def from '../constants/constant_commons';

let initialState = {
  view: null,
  foundation: null,
  blocks: null,
  surfaces: null,
  layers: null,
  windows: null,
};

export default function commons(state = initialState, { type, payload }) {
  switch (type) {
    case Def.SET_VIEW:
      const { view } = payload;
      return { ...state, view };

    case Def.SET_FOUNDATION:
      const { foundation } = payload;
      return { ...state, foundation };

    case Def.SET_BLOCKS:
      const { blocks } = payload;
      return { ...state, blocks };

    case Def.SET_SURFACES:
      const { surfaces } = payload;
      return { ...state, surfaces };

    case Def.SET_LAYERS:
      const { layers } = payload;
      return { ...state, layers };

    case Def.SET_WINDOWS:
      const { windows } = payload;
      return { ...state, windows };

    default:
      return { ...state };
  }
}
