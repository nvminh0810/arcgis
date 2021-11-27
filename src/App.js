import React from "react";
import { Scene } from "@esri/react-arcgis";
import Building from "./components/Building";

function App() {
  return (
    <Scene
      style={{ width: "100vw", height: "100vh" }}
      mapProperties={{ basemap: "topo-vector", ground: "world-elevation" }}
      viewProperties={{
        center: [106.69839762657362, 10.776631901390154],
        zoom: 17,
      }}
    >
      <Building />
    </Scene>
  );
}

export default App;
