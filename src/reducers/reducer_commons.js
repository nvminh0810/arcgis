import * as Def from "../constants/constant_commons";

let initialState = {
  view: null,
  blocks: null,
  foundation: null,
  roof: null,
  stairs: null,
};

export default function commons(state = initialState, action) {
  switch (action.type) {
    case Def.SET_VIEW:
      const { view } = action.payload;
      return { ...state, view };

    case Def.SET_BLOCKS:
      const { blocks } = action.payload;
      return { ...state, blocks };

    case Def.SET_FOUNDATION:
      const { foundation } = action.payload;
      return { ...state, foundation };

    case Def.SET_ROOF:
      const { roof } = action.payload;
      return { ...state, roof };

    case Def.SET_STAIRS:
      const { stairs } = action.payload;
      return { ...state, stairs };

    default:
      return { ...state };
  }
}
