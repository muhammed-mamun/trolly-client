import { useState, useEffect, useRef } from "react";
import { Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";

const API = "http://localhost:1234/";
const DEFAULT_QUERY = "map_view";

const MapLayer = () => {
  const mapCanvasRef = useRef(null);
  const workerRef = useRef(null);
  const [kimage, setKimage] = useState(null);

  useEffect(() => {
    const mapCanvas = document.createElement("canvas");
    const worker = new Worker("./workers/mapWorker.js");
    workerRef.current = worker;

    worker.onmessage = (evt) => {
      const ctx = mapCanvas.getContext("2d");
      ctx.canvas.width = evt.data.width;
      ctx.canvas.height = evt.data.height;
      ctx.putImageData(evt.data, 0, 0);

      setKimage(new Konva.Image({ image: mapCanvas }));
    };

    const requestFullRefresh = async () => {
      try {
        const response = await fetch(API + DEFAULT_QUERY);
        console.log(response);
        // Handle the response data here
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    requestFullRefresh();

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return (
    <Layer ref={mapCanvasRef} className="w-full h-full">
      {kimage && (
        <KonvaImage
          image={kimage.getImage()}
          width={kimage.width()}
          height={kimage.height()}
        />
      )}
    </Layer>
  );
};

export default MapLayer;
