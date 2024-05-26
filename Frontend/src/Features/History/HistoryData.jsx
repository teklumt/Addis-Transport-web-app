import { useState, useEffect } from "react";
import { useAddisTransportContext } from "../../Context/AddisTransportContext";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { IoLocation, IoTimeSharp } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";

function HistoryData() {
  const { history, setHistory, user } = useAddisTransportContext();
  const [filteredHistory, setFilteredHistory] = useState([]);

  useEffect(() => {
    setFilteredHistory(history.filter((item) => item.userId === user.id));
  }, [history, user.id]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/histories/${id}`);
      setFilteredHistory(filteredHistory.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(history, user, filteredHistory);

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="mb-5 text-center text-3xl font-bold text-gray-700">
        History Data
      </h1>
      {filteredHistory.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {filteredHistory.map((item, index) => (
            <div
              key={index}
              className="mt-4 w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
            >
              <div className="flex justify-end">
                <button
                  className="flex  items-center justify-center rounded-full border-[1px] px-1.5 text-sm ease-in-out hover:border-black "
                  onClick={() => deleteItem(item.id)}
                >
                  <p className="font-xs mr-2">Delete</p>
                  <MdDeleteForever size={15} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-slate-400">Name</p>
                  <p>{user?.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Email</p>
                  <p>{user?.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Phone</p>
                  {user?.phone ? (
                    <p>{user?.phone}</p>
                  ) : (
                    <p className="text-slate-400">+251......</p>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Bus ID</p>
                  <p>{item?.vehicleId}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-slate-400">Price</p>
                  <p>{item?.price}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">
                    Start - Destination
                  </p>
                  <p>
                    {item?.start} - {item?.destination}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Date</p>
                  <p>{item?.date}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-400">Time</p>
                  <p>{item?.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center p-32">
          <h1 className="text-center font-mono text-3xl text-slate-400">
            No History Data
          </h1>
        </div>
      )}
    </div>
  );
}

export default HistoryData;
