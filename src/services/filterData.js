import { store } from "../store/index";

export const findSurfaceData = (idSurface) => {
  const { layers } = store.getState().commons;
  if (!layers) return;
  return layers.filter((layer) => idSurface === layer.idSurface);
};

export const findLayerData = (idLayer) => {
  const { layers } = store.getState().commons;
  const { idSubDoor, idSubWall } = layers.find((layer) => idLayer === layer.id);
  const subDoors = findSubDoorData(idSubDoor);
  const subWalls = findSubWallData(idSubWall);
  return { subDoors, subWalls };
};

export const findSubDoorData = (idSubDoor) => {
  const { subDoors } = store.getState().commons;
  if (!subDoors) return;
  return subDoors.filter((subDoor) => idSubDoor === subDoor.id);
};

export const findSubWallData = (idSubWall) => {
  const { subWalls } = store.getState().commons;
  if (!subWalls) return;
  return subWalls.filter((subWall) => idSubWall === subWall.id);
};
