import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Signin() {
  const [adminStatus, setAdminStatus] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const handleSignin = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    if (adminStatus && data.adminCode !== "Teklu@123") {
      toast.error("Invalid Admin Code");
      return;
    }

    axios
      .post("http://localhost:8080/user/add", {
        name: data.name,
        email: data.email,
        password: data.password,
        role: adminStatus ? "Admin" : "User",
      })
      .then((res) => {
        toast.success("Sign In Successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Sign In Failed");
      });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-black text-white lg:flex">
        <div className="p-12">
          <h1 className=" text-5xl font-bold">Join Addis Transport Today</h1>
          <p className="mt-4 text-xl">
            Manage your transportation in Addis Ababa with ease and confidence.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <img
          src="/path/to/your/logo.png"
          alt="Addis Transport"
          className="mb-6 h-24 w-24"
        />
        <h1 className="mb-6 text-2xl font-semibold">Sign In</h1>
        <form onSubmit={handleSubmit(handleSignin)} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="name">
              Name
            </label>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              {...register("name")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              {...register("password")}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-semibold"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          <div className="mb-4 flex gap-4">
            <div>
              <input
                type="radio"
                id="userCheckbox"
                name="role"
                value="User"
                onChange={() => setAdminStatus(false)}
              />
              <label htmlFor="userCheckbox"> User </label>
            </div>
            <div>
              <input
                type="radio"
                id="adminCheckbox"
                name="role"
                value="Admin"
                onChange={() => setAdminStatus(true)}
              />
              <label htmlFor="adminCheckbox"> Admin </label>
            </div>
          </div>
          {adminStatus && (
            <div className="mb-4">
              <label
                className="block text-lg font-semibold"
                htmlFor="adminCode"
              >
                Admin Code
              </label>
              <input
                className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
                type="text"
                id="adminCode"
                name="adminCode"
                placeholder="Admin Code"
                {...register("adminCode")}
              />
            </div>
          )}
          <button
            className="w-full rounded-md bg-black p-2 text-white"
            type="submit"
          >
            Sign In
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Signin;
