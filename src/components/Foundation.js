import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";
import { useSelector } from "react-redux";

export default function Foundation() {
  const { foundation, view } = useSelector((state) => state.commons);
  useEffect(() => {
    console.log(foundation);
    if (!foundation) return;
    foundation.forEach((item) => {
      createPolygon(view, item);
    });
    return () => {};
  }, [foundation]);
  return <div></div>;
}
