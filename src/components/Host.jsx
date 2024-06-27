import { useRef, useEffect } from "react";
import { Stage } from "react-konva";
import MapLayer from "./MapLayer";
import Track from "./Track";

const Host = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    const scaleBy = 1.05;
    const stage = stageRef.current;

    const handleWheel = (e) => {
      e.evt.preventDefault();
      const oldScale = stage.scaleX();

      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
      };

      const newScale =
        e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      stage.scale({ x: newScale, y: newScale });

      const newPos = {
        x:
          -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
          newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    };

    stage.on("wheel", handleWheel);

    return () => {
      stage.off("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="shadow-lg shadow-blue-500/50">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Draw Path</h1>
      <div className="bg-gray-200 p-4">
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageRef}
          className="border border-gray-300 rounded-lg"
        >
          <MapLayer zIndex={1} />
          <Track />
        </Stage>
      </div>
    </div>
  );
};

export default Host;
