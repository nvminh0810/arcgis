import React, { useEffect } from "react";
import { createPolygon } from "../utils/util";

export default function Foundation(props) {
  useEffect(() => {
    props.foundation.forEach((item) => {
      createPolygon(props, item);
    });
    return () => {};
  }, [props.foundation]);
  return null;
}
