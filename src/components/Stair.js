import React, { useEffect } from "react";
import { createPolygon } from "../utils";

export default function Stair(props) {
  useEffect(() => {
    props.stairs.forEach((item) => {
      createPolygon(props, item.nodes, item.height, item.color);
    });
    return () => {};
  }, [props.stairs]);
  return null;
}
