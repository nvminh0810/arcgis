import { createAction } from "redux-actions";
import * as Def from "../constants/constant_commons";

export const setView = createAction(Def.SET_VIEW);
export const setBlocks = createAction(Def.SET_BLOCKS);
export const setFoundation = createAction(Def.SET_FOUNDATION);
export const setRoof = createAction(Def.SET_ROOF);
export const setStairs = createAction(Def.SET_STAIRS);
