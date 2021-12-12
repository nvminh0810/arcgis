import { store } from '../store/index';

export const findSurfaceData = (idSurface) => {
  const { layers } = store.getState().commons;
  if (!layers) return;
  return layers.filter((layer) => idSurface === layer.idSurface);
};

export const findLayerData = (idLayer) => {
  const { layers } = store.getState().commons;
  const {
    idSubDoor,
    idSubWall,
    idGlass,
    idColumn,
    idLine,
    idWindow,
    idDoor,
    idPillar,
    idLineSurround,
  } = layers.find((layer) => idLayer === layer.id);
  const subDoors = findSubDoorData(idSubDoor);
  const subWalls = findSubWallData(idSubWall);
  const glasses = findGlassData(idGlass);
  const columns = findColumnData(idColumn);
  const lines = findLineData(idLine);
  const windows = findWindowData(idWindow);
  const doors = findDoorData(idDoor);
  const pillars = findPillarsData(idPillar);
  const lineSurrounds = findLineSurroundData(idLineSurround);
  return {
    subDoors,
    subWalls,
    glasses,
    columns,
    lines,
    windows,
    doors,
    pillars,
    lineSurrounds,
  };
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

export const findWindowData = (idWindow) => {
  const { windows } = store.getState().commons;
  if (!windows) return;
  return windows.filter((window) => idWindow === window.id);
};

export const findDoorData = (idDoor) => {
  const { doors } = store.getState().commons;
  if (!doors) return;
  return doors.filter((door) => idDoor === door.id);
};

export const findPillarsData = (idPillar) => {
  const { pillars } = store.getState().commons;
  if (!pillars) return;
  return pillars.filter((pillar) => idPillar === pillar.id);
};

export const findLineSurroundData = (idLineSurround) => {
  const { lineSurrounds } = store.getState().commons;
  if (!lineSurrounds) return;
  return lineSurrounds.filter(
    (lineSurround) => idLineSurround === lineSurround.id
  );
};
