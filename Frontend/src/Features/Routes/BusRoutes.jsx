import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function BusRoutes() {
  const { handleSubmit, register, reset, setRoutes } = useForm();
  // console.log(totalUsers);

  const [totalNumOfBus, setTotalNumOfBus] = useState(0);
  const [totalNumOfUsers, setTotalNumOfUsers] = useState(0);
  const [totalNumOfHistory, setTotalNumOfHistory] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/user/getAll").then((res) => {
      setTotalNumOfUsers(res.data.length);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/histories/getAll").then((res) => {
      setTotalNumOfHistory(res.data.length);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/bus/getAll").then((res) => {
      setTotalNumOfBus(res.data.length);
    });
  }, []);

  const handleSubmitAddRout = async (data) => {
    console.log(data);
    const myPromise = axios.post(`http://localhost:8080/bus/add`, data);

    toast.promise(
      myPromise,
      {
        loading: "Sending...",
        success: "Route successfully add",
        error: "Failed to add the route ",
      },
      {
        // style: {
        //   borderRadius: "10px",
        //   background: "#333",
        //   color: "#fff",
        // },
      },
    );

    try {
      await myPromise;
      setTotalNumOfBus(totalNumOfBus + 1);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mx-auto mb-10 mt-5 flex flex-wrap justify-around gap-4 md:w-[1000px]">
        <div className="mt-4 flex h-24 w-48 flex-col items-center justify-center rounded-md bg-white p-6 text-center text-black  shadow-lg">
          <p className="text-2xl font-bold">{totalNumOfBus}+</p>
          <p className="text-lg">Routes</p>
        </div>
        <div className="mt-4 flex h-24 w-48 flex-col items-center justify-center rounded-md bg-white p-6 text-center text-black  shadow-lg">
          <p className="text-2xl font-bold">{totalNumOfUsers}+</p>
          <p className="text-lg">Users</p>
        </div>
        <div className="mt-4 flex h-24 w-48 flex-col items-center justify-center rounded-md bg-white p-6 text-center text-black  shadow-lg">
          <p className="text-2xl font-bold">{totalNumOfHistory}+</p>
          <p className="text-lg">Transactions</p>
        </div>
      </div>
      <div className=" mx-auto mt-16 px-10 sm:w-[500px]">
        <h1 className="mb-5 text-center text-2xl font-bold text-gray-700">
          Add New Routes
        </h1>
        <form onSubmit={handleSubmit(handleSubmitAddRout)}>
          <div>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="Bus name . . ."
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="text"
              id="number"
              name="number"
              placeholder="Bus Number . . ."
              {...register("number", { required: true })}
            />
          </div>
          <div>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="text"
              id="start"
              name="start"
              placeholder="start . . ."
              {...register("start", { required: true })}
            />
          </div>
          <div>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="text"
              id="end"
              name="end"
              placeholder="Destination . . ."
              {...register("end", { required: true })}
            />
          </div>
          <div>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="number"
              id="price"
              name="price"
              placeholder="price . . ."
              {...register("price", { required: true })}
            />
          </div>

          <button
            type="submit"
            className="ml-[73%] mt-2 w-[100px] rounded-md  bg-black p-1 font-serif text-white   sm:ml-[77%]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default BusRoutes;
