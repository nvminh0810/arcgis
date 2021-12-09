import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";

export default function Foundation() {
  const { foundation } = useSelector((state) => state.commons);
  useEffect(() => {
    if (!foundation) return;
    foundation.forEach((item) => {
      createPolygon(item);
    });
    return () => {};
  }, [foundation]);
  return <div></div>;
}
