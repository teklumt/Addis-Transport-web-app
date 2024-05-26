import { useEffect, useState } from "react";
import axios from "axios";
import { useAddisTransportContext } from "../../Context/AddisTransportContext";
import { FaEdit } from "react-icons/fa";
import styled from "styled-components";
import { MdCancel } from "react-icons/md";
import { set, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

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

function ProfileData() {
  const { user, setUser } = useAddisTransportContext();
  const navigator = useNavigate();
  // console.log(user);
  if (!user) {
    navigator("/");
  }
  const [showEditModal, setShowEditModal] = useState(false);

  const { register, handleSubmit, setValue } = useForm();

  const handleEdition = (data) => {
    data = { ...data, id: user.id, role: user.role, password: user.password };
    axios
      .put(`http://localhost:8080/user/${data.id}`, data)
      .then((res) => {
        toast.success("Profile updated successfully");

        axios
          .get(`http://localhost:8080/user/${data.id}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to fetch updated user data");
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update profile");
      });
    setShowEditModal(!showEditModal);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/user/getAll").then((res) => {
      const fetchedUser = res.data.find((users) => users.id === user?.id);
      setUser(fetchedUser);

      setValue("name", fetchedUser.name);
      setValue("email", fetchedUser.email);
      setValue("phone", fetchedUser.phone);
      setValue("city", fetchedUser.city);
      setValue("deposit", fetchedUser.deposit);
    });
  }, [setUser, setValue, user?.id]);

  return (
    <>
      <div className="space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <div className="flex items-center gap-6 rounded-lg border-2 p-4">
          <img
            className="h-24 w-24 rounded-full"
            src="../../public/img/avatars/avatar5.png"
            alt=""
          />
          <div className="flex w-full items-start justify-between">
            <div>
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-gray-500">{user?.role}</p>
              <p className="flex items-center gap-1 text-sm text-gray-400">
                <span>User Id: </span>
                <p className="text-[17px]">{user?.id}</p>
              </p>
            </div>

            <Link to="/">
              <button className="flex items-center justify-center rounded-full border-[1px] px-1.5 text-sm">
                <p className="font-xs mr-2">Log Out</p>
                <IoIosLogOut />
              </button>
            </Link>
          </div>
        </div>
        <div className="rounded-lg border-2 p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Personal Information</h2>
            <button
              className="flex items-center justify-center rounded-full border-[1px] px-1.5 text-sm"
              onClick={() => setShowEditModal(!showEditModal)}
            >
              <p className="font-xs mr-2">Edit</p>
              <FaEdit />
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
              <p>{user.phone ? user.phone : "+251......"}</p>
            </p>
            <p>
              <p className="font-semibold text-slate-400">Role</p>
              <p>{user?.role}</p>
            </p>
          </div>
        </div>
        <div className="rounded-lg border-2 p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Account Information</h2>
            <button
              className="flex items-center justify-center rounded-full border-[1px] px-1.5 text-sm"
              onClick={() => setShowEditModal(!showEditModal)}
            >
              <p className="font-xs mr-2">Edit</p>
              <FaEdit />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <p>
              <p className="text-slate-400">Country</p>Ethiopia
            </p>
            <p>
              <p className="text-slate-400">City</p>
              {user.city ? user?.city : "Addis..."}
            </p>
            <p>
              <p className="text-slate-400">Deposit (Birr)</p>
              {user?.deposit}
            </p>
          </div>
        </div>
      </div>

      {showEditModal && (
        <StyledDiv>
          <ModalContent>
            <div className="flex justify-end">
              <button
                className="flex items-center justify-center rounded-full border-[1px] px-1.5 text-sm"
                onClick={() => setShowEditModal(!showEditModal)}
              >
                <p className="font-xs mr-2">Close</p>
                <MdCancel size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit(handleEdition)}>
              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
              </div>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
              </div>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="city"
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                />
              </div>

              <div className="mb-4">
                <label
                  className="mb-2 block text-sm font-bold text-gray-700"
                  htmlFor="deposit"
                >
                  Deposit
                </label>
                <input
                  className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                  id="deposit"
                  type="number"
                  placeholder="Deposit"
                  {...register("deposit", { required: true })}
                />
              </div>

              <div className="flex justify-end">
                <button className="w-16 rounded bg-black p-1 text-white">
                  Save
                </button>
              </div>
            </form>
          </ModalContent>
        </StyledDiv>
      )}
    </>
  );
}

export default ProfileData;
