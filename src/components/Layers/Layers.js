import React from 'react';
import { useSelector } from 'react-redux';
import FirstFloorWindows from './FirstFloorWindows';
import SecondFloorWindows from './SecondFloorWindows';
import Glasses from './Glasses';
import Lines from './Lines';
import Columns from './Columns';

export default function Layers({ layer, segment }) {
  const { windows, glasses, lines, columns } = useSelector(
    (state) => state.commons
  );
  const checkDataExist = () => windows && glasses && lines && columns;

  const renderObjects = () => {
    const {
      id,
      idGlasses,
      idWindows,
      idDoor,
      idLine,
      idColumn,
      idSubDoor,
      idSubWall,
    } = layer;

    return Object.keys(layer)
      .filter((key) => layer[key])
      .map((key, index) => {
        switch (key) {
          // case 'idGlasses':
          //   return glasses
          //     .filter((item) => idGlasses.includes(item.id))
          //     .map((glass) => (
          //       <Glasses glass={glass} segment={segment} key={index} />
          //     ));
          // case 'idWindows':
          //   return windows
          //     .filter((item) => idWindows.includes(item.id))
          //     .map((window) =>
          //       window.idFloor === 1 ? (
          //         <FirstFloorWindows
          //           window={window}
          //           segment={segment}
          //           key={index}
          //         />
          //       ) : (
          //         <SecondFloorWindows
          //           window={window}
          //           segment={segment}
          //           key={index}
          //         />
          //       )
          //     );
          // case 'idLine':
          //   const line = lines.find((item) => item.id === idLine);
          //   return <Lines line={line} key={index} />;
          // case 'idColumn':
          //   const column = columns.find((item) => item.id === idColumn);
          //   return <Columns column={column} segment={segment} key={index} />;
          default:
            return null;
        }
      });
  };

  return <>{checkDataExist() && renderObjects()}</>;
}
