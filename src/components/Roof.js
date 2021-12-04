import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";

export default function Roof() {
  const { roof, view } = useSelector((state) => state.commons);
  useEffect(() => {
    roof.forEach((item) => {
      createPolygon(view, item);
    });
    return () => {};
  }, [roof]);
  return null;
}
