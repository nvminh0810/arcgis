import { store } from '../store/index';

export const findSurfaceData = (idSurface) => {
  const { layers } = store.getState().commons;
  if (!layers) return;
  return layers.filter((layer) => idSurface === layer.idSurface);
};

export const findLayerData = (idLayer) => {
  const { layers } = store.getState().commons;
  const { idSubDoor, idSubWall, idGlass, idColumn, idLine } = layers.find(
    (layer) => idLayer === layer.id
  );
  const subDoors = findSubDoorData(idSubDoor);
  const subWalls = findSubWallData(idSubWall);
  const glasses = findGlassData(idGlass);
  const columns = findColumnData(idColumn);
  const lines = findLineData(idLine);
  return { subDoors, subWalls, glasses, columns, lines };
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

export const findGlassData = (idGlass) => {
  const { glasses } = store.getState().commons;
  if (!glasses) return;
  return glasses.filter((glass) => idGlass === glass.id);
};

export const findColumnData = (idColumn) => {
  const { columns } = store.getState().commons;
  if (!columns) return;
  return columns.filter((column) => idColumn === column.id);
};

export const findLineData = (idLine) => {
  const { lines } = store.getState().commons;
  if (!lines) return;
  return lines.filter((line) => idLine === line.id);
};
