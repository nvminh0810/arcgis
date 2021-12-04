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
