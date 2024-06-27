import { useState, useRef, useEffect, useCallback } from "react";
import { Line, Layer } from "react-konva";
import axios from 'axios';

const Track = () => {
  const layerRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [curMousePos, setCurMousePos] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [segments, setSegments] = useState([]);
  const [radius] = useState(9999999);
  const [stop, setStop] = useState(0);

  const getMousePos = useCallback((stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  }, []);

  const handleClick = useCallback((event) => {
    if (isFinished || stop === 1) return;

    const mousePos = getMousePos(event.target.getStage());
    setPoints(prevPoints => [...prevPoints, mousePos]);
  }, [isFinished, stop, getMousePos]);

  const handleMouseMove = useCallback((event) => {
    const mousePos = getMousePos(event.target.getStage());
    setCurMousePos(mousePos);
  }, [getMousePos]);

  const handleDoubleClick = useCallback(async () => {
    setStop(1);
    setIsFinished(true);

    const newSegments = [[points[0], points[1], radius]];
    setSegments(newSegments);

    try {
      await axios.post('http://192.168.0.104:3000/posts/newPath');
      console.log("Path sent successfully");
    } catch (error) {
      console.error("Error sending path:", error);
    }
  }, [points, radius]);

  useEffect(() => {
    const stage = layerRef.current.getStage();
    stage.on("click", handleClick);
    stage.on("mousemove", handleMouseMove);
    stage.on("dblclick", handleDoubleClick);

    return () => {
      stage.off("click");
      stage.off("mousemove");
      stage.off("dblclick");
    };
  }, [handleClick, handleMouseMove, handleDoubleClick]);

  const linePoints = points
    .concat(isFinished ? [] : curMousePos)
    .reduce((a, b) => a.concat(b), []);

  return (
    <div className="relative w-full h-full">
      <Layer ref={layerRef}>
        <Line
          points={linePoints}
          stroke="red"
          strokeWidth={1}
        />
      </Layer>
    </div>
  );
};

export default Track;