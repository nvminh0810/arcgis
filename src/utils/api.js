import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const getRoof = async () => {
  try {
    const response = await axios.get("/roof");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFoundation = async () => {
  try {
    const response = await axios.get("/foundation");
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

export const getWindows = async () => {
  try {
    const response = await axios.get("/windows");
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

export const getGlasses = async () => {
  try {
    const response = await axios.get("/glasses");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getFirstFloorWindows = async () => {
  try {
    const response = await axios.get("/firstFloorwindows");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getSecondFloorWindows = async () => {
  try {
    const response = await axios.get("/secondFloorwindows");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSideDoors = async () => {
  try {
    const response = await axios.get("/sideDoors");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLineBetweenFloors = async () => {
  try {
    const response = await axios.get("/lineBetweenFloors");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFloors = async () => {
  try {
    const response = await axios.get("/floors");
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

export const getRoofWindows = async () => {
  try {
    const response = await axios.get('/roofWindows');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
