import { CgSelectO } from "react-icons/cg";
import { useAddisTransportContext } from "../Context/AddisTransportContext";
import { FaBusAlt, FaExternalLinkAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import axios from "axios";
import { MdCancel } from "react-icons/md";

const StyledDiv = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 0.5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
`;

function HomePage() {
  const { routes, user, setUser, setRoutes } = useAddisTransportContext();

  // updating the routes state with the fetched data from the server side using axios every time the component is rendered
  useEffect(() => {
    axios.get("http://localhost:8080/bus/getAll").then((res) => {
      setRoutes(res.data);
    });
  }, [setRoutes]);

  // console.log(routes);

  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  // console.log(user);

  const [totalNumOfBus, setTotalNumOfBus] = useState(0);
  const [totalNumOfUsers, setTotalNumOfUsers] = useState(0);
  const [totalNumOfHistory, setTotalNumOfHistory] = useState(0);

  function handleStartChanges(e) {
    const start = e.target.value;
    if (start === "") return setFilteredRoutes(routes);
    const filtered = routes.filter(
      (route) =>
        route.start.toLowerCase().includes(start.toLowerCase()) ||
        route.end.toLowerCase().includes(start.toLowerCase()),
    );
    setFilteredRoutes(filtered);
  }

  function handleEndChanges(e) {
    const end = e.target.value;
    if (end === "") return setFilteredRoutes(routes);
    const filtered = routes.filter(
      (route) =>
        route.end.toLowerCase().includes(end.toLowerCase()) ||
        route.start.toLowerCase().includes(end.toLowerCase()),
    );
    setFilteredRoutes(filtered);
  }

  function handleBusSelection(id) {
    setSelectedBus(id);
    setShowTicketModal(true);
  }

  const selectedBusRoute = filteredRoutes.find(
    (item) => item.id === selectedBus,
  );
  function handleBuyingTicket() {
    if (user.deposit < selectedBusRoute.price) {
      toast.error("Insufficient balance");
      return;
    }
    if (!document.getElementById("appt").value) {
      toast.error("Please select time");
      return;
    }
    const updatedUser = {
      ...user,
      deposit: user.deposit - selectedBusRoute.price,
    };

    axios.put(`http://localhost:8080/user/${user.id}`, updatedUser);
    axios.post("http://localhost:8080/histories/add", {
      userId: user.id,
      vehicleId: selectedBus,
      price: selectedBusRoute.price,
      start: selectedBusRoute.start,
      destination: selectedBusRoute.end,
      date: new Date().toLocaleDateString(),
      time: document.getElementById("appt").value.toString(),
    });

    setUser(updatedUser);
    toast.success("Ticket bought successfully");
  }

  function handleFilter() {
    const start = document.getElementById("start").value;
    const end = document.getElementById("destination").value;
    if (start === "" && end === "") return setFilteredRoutes(routes);
    const filtered = routes.filter(
      (route) =>
        (route.start.toLowerCase().includes(start.toLowerCase()) &&
          route.end.toLowerCase().includes(end.toLowerCase())) ||
        (route.end.toLowerCase().includes(start.toLowerCase()) &&
          route.start.toLowerCase().includes(end.toLowerCase())),
    );
    setFilteredRoutes(filtered);
  }
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

  return (
    <>
      <div>
        <div className="mx-auto mb-10 mt-5 flex flex-wrap justify-around gap-4 md:w-[700px]">
          <div className="mt-4 flex h-24 w-48 flex-col items-center justify-center rounded-md bg-white p-6 text-center text-black  shadow-lg">
            <p className="text-2xl font-bold">{filteredRoutes.length}+</p>
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

        <div className="mx-auto mt-5 w-[300px] sm:w-[500px]">
          <div className="flex items-center gap-3">
            <IoLocation size={20} />
            <input
              className="mt-2 w-[270px] rounded-md border-2 border-gray-300 p-1 outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 sm:w-[500px]"
              type="text"
              id="start"
              name="start"
              placeholder="Start ..."
              onChange={handleStartChanges}
            />
          </div>
          <div className="flex items-center gap-3">
            <FaMapLocationDot size={20} />
            <input
              className="mt-2 w-[270px] rounded-md border-2 border-gray-300 p-1 outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 sm:w-[500px]"
              type="text"
              id="destination"
              name="destination"
              placeholder="Destination ..."
              onChange={handleEndChanges}
            />
          </div>
          <button
            onClick={() => handleFilter()}
            className="ml-[55%] mt-2 w-[100px]  rounded-md bg-black p-1 text-white   sm:ml-[80%]"
          >
            Filter
          </button>
        </div>

        <div className="">
          <div className="mx-auto flex  flex-col items-center justify-center">
            <div className=" mt-5 flex  gap-8  font-semibold ">
              <p className=" w-[10px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                No
              </p>
              <p className=" w-[80px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                Start
              </p>
              <p className=" w-[80px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                Destination
              </p>
              <p className=" w-[10px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                Price
              </p>
              <p className=" w-[15px] sm:w-[5px] md:w-[10px] lg:w-[10px]"></p>
            </div>
            <div className="mt-5">
              {filteredRoutes?.map((route) => (
                <div
                  className=" mt-5 flex gap-8 border-b-2 text-sm text-slate-600 sm:text-[16px] md:text-lg "
                  key={route._id}
                >
                  <p className="w-[10px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                    {route.number}
                  </p>
                  <p className="w-[80px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                    {route.start}
                  </p>
                  <p className="w-[80px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                    {route.end}
                  </p>
                  <p className="w-[10px] sm:w-[90px] md:w-[110px] lg:w-[150px]">
                    {route.price}
                  </p>
                  <button
                    className="text-black"
                    onClick={() => handleBusSelection(route.id)}
                  >
                    {/* <FaExternalLinkAlt /> */}
                    <FaBusAlt />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showTicketModal && (
        <StyledDiv>
          <ModalContent>
            <div className="flex justify-between">
              <h2 className="font-semibold">Ticket Information</h2>
              <button
                className="flex items-center justify-center rounded-full border-[1px] px-1.5 text-sm"
                onClick={() => setShowTicketModal(!showTicketModal)}
              >
                <p className="font-xs mr-2">Close</p>
                <MdCancel size={18} />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <p>
                <p className="font-semibold text-slate-400">Name</p>
                <p>{user?.name}</p>
              </p>
              <p>
                <p className="font-semibold text-slate-400">Email</p>
                <p>{user?.email}</p>
              </p>
              <p>
                <p className="font-semibold text-slate-400">Phone</p>
                {user?.phone ? (
                  <p>{user?.phone}</p>
                ) : (
                  <p className="text-slate-400">+251......</p>
                )}
              </p>
              <p>
                <p className="font-semibold text-slate-400">Bus ID</p>
                {selectedBus ? (
                  <p>{selectedBus}</p>
                ) : (
                  <p className="text-slate-400">No Bus Selected</p>
                )}
              </p>

              <div>
                <p className="font-semibold text-slate-400">Price</p>
                <p>{selectedBusRoute?.price}</p>
              </div>
              <div>
                <p className="font-semibold text-slate-400">
                  Start - destination
                </p>

                <p>
                  {selectedBusRoute?.start} - {selectedBusRoute?.end}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-slate-400">Select Time:</p>
              <input
                type="time"
                id="appt"
                name="appt"
                min="09:00"
                max="18:00"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                className="mt-2 w-[100px]  rounded-md bg-black p-1 text-white"
                onClick={handleBuyingTicket}
              >
                Book
              </button>
            </div>
          </ModalContent>
        </StyledDiv>
      )}
    </>
  );
}

export default HomePage;

/*
<ModalContent>
            <div className="flex justify-between">
              <h2 className="font-semibold">Ticket Information</h2>
              <button
                className="flex items-center justify-center rounded-full border-[1px] px-1.5 text-sm"
                onClick={() => setShowTicketModal(!showTicketModal)}
              >
                <p className="font-xs mr-2">Close</p>
                <CgSelectO />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <p>
                <p className="font-semibold text-slate-400">Name</p>
                <p>John Doe</p>
              </p>
              <p>
                <p className="font-semibold text-slate-400">Email</p>
                <p>
                  <a href="mailto:" className="text-blue-500"></a>
                </p>
              </p>
              <p>
                <p className="font-semibold text-slate-400">Phone</p>
                <p>+251......</p>
              </p>
              <p>
                <p className="font-semibold text-slate-400">Role</p>
                <p>Passenger</p>
              </p>
            </div>
          </ModalContent>*/
