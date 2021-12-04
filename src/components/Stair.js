import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";

export default function Stair() {
  const { stairs, view } = useSelector((state) => state.commons);
  useEffect(() => {
    stairs.forEach((item) => {
      createPolygon(view, item);
    });
    return () => {};
  }, [stairs]);
  return null;
}
