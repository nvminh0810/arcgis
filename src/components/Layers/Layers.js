import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FirstFloorWindows from './FirstFloorWindows';

export default function Layers({ layer, segment }) {
  const { windows } = useSelector((state) => state.commons);

  useEffect(() => {
    console.log(layer);
  }, []);
  const renderObjects = () => {
    const {
      id,
      idFloor,
      idGlasse,
      idWindow,
      idDoor,
      idLine,
      idColumn,
      idSubDoor,
      idSubWall,
    } = layer;

    return Object.keys(layer)
      .filter((key) => layer[key])
      .map((key) => {
        switch (key) {
          case 'idWindow':
            const window = windows.find((window) => window.id === idWindow);
            return (
              <FirstFloorWindows window={window} segment={segment} key={id} />
            );

          default:
            return null;
        }
      });
  };

  return <>{windows && renderObjects()}</>;
}
