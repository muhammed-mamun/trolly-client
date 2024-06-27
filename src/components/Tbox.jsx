import { useState } from 'react';
import axios from 'axios';

const Tbox = () => {
  const [inputPath, setInputPath] = useState('');
  const [inputMap, setInputMap] = useState('');

  const sendPath = async () => {
    try {
      await axios.post('https://596cc46c-e8fa-4f0e-a04d-76a657a62a44.mock.pstmn.io/v1/home1', inputPath);
      console.log("Sending path:", inputPath);
    } catch (error) {
      console.error("Error sending path:", error);
    }
  };

  const sendMapName = async () => {
    try {
      await axios.post('https://596cc46c-e8fa-4f0e-a04d-76a657a62a44.mock.pstmn.io/v1/home1', inputMap);
      console.log("Sending map name:", inputMap);
    } catch (error) {
      console.error("Error sending map name:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter the file name"
            value={inputMap}
            onChange={(e) => setInputMap(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={sendMapName}
          >
            Send Map Name
          </button>
        </div>
        <div>
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter the path name"
            value={inputPath}
            onChange={(e) => setInputPath(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            onClick={sendPath}
          >
            Send Path Name
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tbox;