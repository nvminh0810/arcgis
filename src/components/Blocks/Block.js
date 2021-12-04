import React, { useEffect } from "react";
import { createPolygon } from "../../utils/util";
import { useSelector } from "react-redux";

export default function Block() {
  const { blocks, view } = useSelector((state) => state.commons);
  useEffect(() => {
    blocks.forEach((item) => {
      createPolygon(view, item);
    });
    return () => {};
  }, [blocks]);
  return <div></div>;
}
