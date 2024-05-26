import Header from "../../UI/Header";
import { IoHome } from "react-icons/io5";
import { MdHistory, MdFeedback } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa";
import { MdDeveloperMode } from "react-icons/md";
import { IoIosLogOut, IoMdAddCircle } from "react-icons/io";

import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAddisTransportContext } from "../../Context/AddisTransportContext";
import toast, { Toaster } from "react-hot-toast";

function Dashboard() {
  const { smallscreen, setSmallscreen, user, setAdminStatus, adminStatus } =
    useAddisTransportContext();

  setAdminStatus(user.role === "Admin" ? true : false);

  // console.log(smallscreen);

  return (
    <div className=" flex font-serif">
      <div className="h-[100dvh] bg-black p-3 text-white  md:w-[300px] md:pl-8 ">
        {!smallscreen && (
          <Link to={"/home"}>
            <p className="mt-5 text-xl font-semibold">Addis Transpost</p>
          </Link>
        )}
        <div className="mt-20">
          <ul>
            <Link to={"/home"}>
              <li className=" mt-5 flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer ">
                <IoHome size={smallscreen && 25} className="text-yellow-200" />
                {!smallscreen && "Home"}
              </li>
            </Link>
            <Link to={"history"}>
              <li className=" mt-5 flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer">
                <MdHistory
                  size={smallscreen && 25}
                  className="text-yellow-200"
                />
                {!smallscreen && "History"}
              </li>
            </Link>
            <Link to={"feedback"}>
              <li className=" mt-5 flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer">
                <MdFeedback
                  size={smallscreen && 25}
                  className="text-yellow-200"
                />
                {!smallscreen && (adminStatus ? "Feedbacks" : "Give Feedback")}
              </li>
            </Link>
            <Link to={"news"}>
              <li className=" mt-5 flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer">
                <FaRegNewspaper
                  size={smallscreen && 25}
                  className="text-yellow-200"
                />
                {!smallscreen && "What is new?"}
              </li>
            </Link>
            {adminStatus && (
              <Link to={"addroute"}>
                <li className=" mt-5 flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer">
                  <IoMdAddCircle
                    size={smallscreen && 25}
                    className="text-yellow-200"
                  />
                  {!smallscreen && "Add Routes"}
                </li>
              </Link>
            )}
            <Link to={"contactus"}>
              <li className=" mt-5 flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer">
                <MdDeveloperMode
                  size={smallscreen && 25}
                  className="text-yellow-200"
                />
                {!smallscreen && "Contact Us"}
              </li>
            </Link>

            <Link to={"/"}>
              <li className=" mt-[90%] flex items-center gap-3 text-lg text-slate-300 hover:cursor-pointer ">
                <IoIosLogOut
                  size={smallscreen && 25}
                  className="text-yellow-200"
                />
                {!smallscreen && "Log Out"}
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="h-[100dvh] w-full">
        <Header />
        <div className="scroll mb-3 h-[90vh] overflow-y-scroll  pb-4">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Dashboard;
