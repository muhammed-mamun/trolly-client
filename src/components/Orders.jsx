import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.104:3000/gets/retrieveAllOrders');
        setOrders(response.data.map(order => ({
          value: order._id,
          label: order._id,
        })));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  const handleTransmitted = useCallback(async () => {
    try {
      await axios.put(`http://192.168.0.104:3000/puts/executeOrderById/${selected}`, selected);
      console.log("transmitted");
      // Consider adding some user feedback here, like a toast notification
    } catch (error) {
      console.error('Error transmitting orders:', error);
      // Consider adding error feedback to the user
    }
  }, [selected]);

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Order Management</h1>
      <div className="flex flex-col w-full max-w-md p-4 border rounded-md shadow-md bg-white">
        <DualListBox
          options={orders}
          selected={selected}
          icons={{
            moveLeft: '<',
            moveAllLeft: '<<',
            moveRight: '>',
            moveAllRight: '>>',
          }}
          onChange={setSelected}
          className="flex-grow mb-4"
        />
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleTransmitted}
          disabled={selected.length === 0}
        >
          Execute
        </button>
      </div>
    </div>
  );
};

export default Orders;