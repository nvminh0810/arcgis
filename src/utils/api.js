import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:3000",
});

export const getBlocks = async () => {
  try {
    const response = await axios.get("/blocks");
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
