import * as Def from '../constants/constant_commons';

let initialState = {
  view: null,
  foundation: null,
  blocks: null,
  floorBases: null,
  surfaces: null,
  layers: null,
  windows: null,
  glasses: null,
  columns: null,
  lines: null,
  subDoors: null,
  subWalls: null,
  lineSurrounds: null,
  roofWindows: null,
  doors: null,
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

    case Def.SET_FLOORBASES:
      const { floorBases } = payload;
      return { ...state, floorBases };

    case Def.SET_SURFACES:
      const { surfaces } = payload;
      return { ...state, surfaces };

    case Def.SET_LAYERS:
      const { layers } = payload;
      return { ...state, layers };

    case Def.SET_WINDOWS:
      const { windows } = payload;
      return { ...state, windows };

    case Def.SET_GLASSES:
      const { glasses } = payload;
      return { ...state, glasses };

    case Def.SET_LINES:
      const { lines } = payload;
      return { ...state, lines };

    case Def.SET_COLUMNS:
      const { columns } = payload;
      return { ...state, columns };

    case Def.SET_SUBDOORS:
      const { subDoors } = payload;
      return { ...state, subDoors };

    case Def.SET_SUBWALLS:
      const { subWalls } = payload;
      return { ...state, subWalls };

    case Def.SET_PILLAR:
      const { pillars } = payload;
      return { ...state, pillars };

    case Def.SET_LINE_SURROUNDS:
      const { lineSurrounds } = payload;
      return { ...state, lineSurrounds };

    case Def.SET_ROOF_WINDOWS:
      const { roofWindows } = payload;
      return { ...state, roofWindows };

    case Def.SET_DOORS:
      const { doors } = payload;
      return { ...state, doors };
    default:
      return { ...state };
  }
}
