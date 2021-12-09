import { createAction } from "redux-actions";
import * as Def from "../constants/constant_commons";

export const setView = createAction(Def.SET_VIEW);
export const setFoundation = createAction(Def.SET_FOUNDATION);
export const setBlocks = createAction(Def.SET_BLOCKS);
export const setSurfaces = createAction(Def.SET_SURFACES);
export const setLayers = createAction(Def.SET_LAYERS);
export const setWindows = createAction(Def.SET_WINDOWS);
export const setLines = createAction(Def.SET_LINES);
export const setGlasses = createAction(Def.SET_GLASSES);
export const setColumns = createAction(Def.SET_COLUMNS);
export const setSubDoors = createAction(Def.SET_SUBDOORS);
export const setSubWalls = createAction(Def.SET_SUBWALLS);
