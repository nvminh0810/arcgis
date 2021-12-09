import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";

export default function Stair() {
  const { stairs } = useSelector((state) => state.commons);
  useEffect(() => {
    stairs.forEach((item) => {
      createPolygon(item);
    });
    return () => {};
  }, [stairs]);
  return null;
}
