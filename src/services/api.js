import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const getFoundation = async () => {
  try {
    const response = await axios.get("/foundation");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlocks = async () => {
  try {
    const response = await axios.get("/blocks");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSurfaces = async () => {
  try {
    const response = await axios.get("/surfaces");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getLayers = async () => {
  try {
    const response = await axios.get("/layers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getStairs = async () => {
  try {
    const response = await axios.get("/stairs");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRoof = async () => {
  try {
    const response = await axios.get("/roof");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getWindows = async () => {
  try {
    const response = await axios.get("/windows");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDoors = async () => {
  try {
    const response = await axios.get("/doors");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGlasses = async () => {
  try {
    const response = await axios.get("/glasses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLines = async () => {
  try {
    const response = await axios.get("/lines");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getColumns = async () => {
  try {
    const response = await axios.get("/columns");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubDoors = async () => {
  try {
    const response = await axios.get("/subDoors");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubWalls = async () => {
  try {
    const response = await axios.get("/subWalls");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFloorBases = async () => {
  try {
    const response = await axios.get("/floorBases");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPillars = async () => {
  try {
    const response = await axios.get("/pillars");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLineSurrounds = async () => {
  try {
    const response = await axios.get("/lineSurrounds");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
