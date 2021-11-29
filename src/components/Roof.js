import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";

export default function Roof(props) {
  useEffect(() => {
    props.roof.forEach((item) => {
      createPolygon(props, item.nodes, item.height, item.color);
    });
    return () => {};
  }, [props.roof]);
  return null;
}
