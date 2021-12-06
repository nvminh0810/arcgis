import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import FirstFloorWindows from '../Layer/FirstFloorWindows';
import Glasses from '../Layer/Glasses';
import SideDoors from '../Layer/SideDoors';
import LineBetweenFloors from '../Layer/LineBetweenFloors';
import Columns from '../Layer/Columns';
import SecondFloorWindows from '../Layer/SecondFloorWindows';

export default function Block() {
  const { blocks } = useSelector((state) => state.commons);
  useEffect(() => {
    return () => {};
  }, [blocks]);
  const renderSurfaces = () => {
    return blocks.map((block) => {
      let { surfaces } = block;

      return surfaces.map((surface) => {
        let { fPoint, lPoint, floors, segment } = surface;
        const data = { fPoint, lPoint, segment };
        return floors.map((floor) => (
          <>
            {floor.glass && (
              <Glasses
                floor={floor.id}
                data={data}
                glass={floor.glass}
                key={Math.random()}
              />
            )}
            {floor.window &&
              (floor.id === 1 ? (
                <FirstFloorWindows
                  data={data}
                  window={floor.window}
                  key={Math.random()}
                />
              ) : (
                <SecondFloorWindows
                  data={data}
                  window={floor.window}
                  key={Math.random()}
                />
              ))}
            {floor.door && (
              <SideDoors data={data} door={floor.door} key={Math.random()} />
            )}
            {floor.lineBetweenFloor && (
              <LineBetweenFloors
                data={data}
                lineBetweenFloor={floor.lineBetweenFloor}
                key={Math.random()}
              />
            )}
            {floor.column && (
              <Columns data={data} column={floor.column} key={Math.random()} />
            )}
          </>
        ));
      });
    });
  };
  return <div>{blocks && renderSurfaces()}</div>;
}
