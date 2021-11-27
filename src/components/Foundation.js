import React, { useEffect } from "react";
import { createPolygon } from "../utils/index";

export default function Foundation(props) {
  useEffect(() => {
    props.foundation.forEach((item) => {
      createPolygon(props, item.nodes, item.height, item.color);
    });
    return () => {};
  }, [props.foundation]);
  return null;
}
