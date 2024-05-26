import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddisTransportContext } from "../Context/AddisTransportContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

function Login() {
  const { register, handleSubmit } = useForm();
  const { user, setUser } = useAddisTransportContext();
  const navigator = useNavigate();

  const handlelogin = (data) => {
    axios.get("http://localhost:8080/user/getAll").then((res) => {
      const fetchedUser = res.data.find(
        (user) => user.email === data.email && user.password === data.password,
      );
      if (fetchedUser) {
        setUser(fetchedUser);
        toast.success("Login Successful");
        setTimeout(() => {
          navigator("/home", { state: { user: fetchedUser } });
        }, 1000);
      } else {
        toast.error("Invalid Email or Password");
      }
    });
  };

  return (
    <div className="flex h-screen">
      <div className="hidden w-1/2 flex-col items-center justify-center bg-black text-white lg:flex">
        <div className="p-12">
          <h1 className="text-5xl font-bold">
            Transportation That's Always On Your Hand
          </h1>
          <p className="mt-4 text-xl">
            Addis Transport is a reliable platform to manage your transportation
            needs in Addis Ababa.
          </p>
          <div className="mt-8 rounded-lg bg-lime-100 p-4 text-black shadow-lg">
            <p className="font-semibold">
              "Addis Transport is a fantastic app that made my commute in Addis
              Ababa so much easier. I love the reliable routes and the ability
              to plan my travel ahead of time. It's truly transformed my daily
              transportation."
            </p>
            <div className="mt-5 flex items-center gap-2">
              <img
                className="w-16 rounded-full"
                src="../../public/bus/pp.jpg"
                alt=""
              />
              <div>
                <p className="t mt-2 font-semibold">Teklu Moges</p>
                <p className="text-sm font-semibold text-gray-500">Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <img
          src="../../public/img/auth/login.png"
          alt="Addis Transport"
          className="mb-6 h-24 w-24"
        />
        <h1 className="mb-6 text-2xl font-semibold">Login</h1>
        <form onSubmit={handleSubmit(handlelogin)} className="w-full max-w-md">
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
          <div className="mb-4 text-right">
            <Link className="text-blue-500" to="/forgot-password">
              Forgot Password?
            </Link>
          </div>
          <button
            className="w-full rounded-md bg-black p-2 text-white"
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signin" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Login;
