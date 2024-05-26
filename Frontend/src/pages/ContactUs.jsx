import { CiLocationOn } from "react-icons/ci";
import { FaTelegram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import {
  MdOutlineCopyright,
  MdOutlineEmail,
  MdSettingsPhone,
} from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function ContactUs() {
  const { register, handleSubmit, reset } = useForm();

  function handleDeveloperContact(data) {
    // console.log(data);
    toast.success("Message sent successfully");
    reset();
  }

  return (
    <>
      <div className="flex flex-wrap bg-white p-10 text-black">
        <div className="w-full p-5 md:w-1/2">
          <h1 className="mb-5 text-3xl font-bold">Contact Us</h1>
          <p className="mb-5 text-gray-600">
            Any questions? We would be happy to help you.
          </p>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3 rounded border border-gray-300 p-3">
              <MdSettingsPhone size={24} />
              <a href="tel:0900423958" className="text-gray-700">
                0900423958
              </a>
            </div>
            <div className="flex items-center gap-3 rounded border border-gray-300 bg-gray-200 p-3">
              <MdOutlineEmail size={24} />
              <a href="mailto:teklumoges6@gmail.com" className="text-gray-700">
                teklumoges482@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3 rounded border border-gray-300 p-3">
              <CiLocationOn size={24} />
              Addis Ababa, Ethiopia
            </div>
          </div>
          <div className="mt-5 flex gap-5">
            <a href="https://t.me/tsemadre" className="text-gray-700">
              <FaTelegram size={30} />
            </a>
            {/* <a href="https://wa.me/251900423958" className="text-gray-700">
            <IoLogoWhatsapp size={30} />
          </a> */}
          </div>
        </div>
        <div className="w-full p-5 md:w-1/2">
          <form
            className="flex flex-col space-y-3"
            onSubmit={handleSubmit(handleDeveloperContact)}
          >
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="w-1/2 rounded border border-gray-300 p-3 text-gray-700"
                {...register("firstName")}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-1/2 rounded border border-gray-300 p-3 text-gray-700"
                {...register("lastName")}
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="rounded border border-gray-300 p-3 text-gray-700"
              {...register("email")}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="rounded border border-gray-300 p-3 text-gray-700"
              name="phoneNumber"
              {...register("phoneNumber")}
            />
            <textarea
              placeholder="Message"
              className="h-32 rounded border border-gray-300 p-3 text-gray-700"
              name="message"
              {...register("message")}
            ></textarea>
            <button className="flex items-center justify-center rounded bg-black p-3 text-white">
              Send Message <FiSend className="ml-2" />
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-sm font-semibold text-gray-600">
        <p className="mb-2">
          Developed by{" "}
          <a href="https://t.me/tsemadre" className="text-gray-700">
            Teklu Moges
          </a>
        </p>
        <p className="flex items-center gap-2">
          <MdOutlineCopyright /> 2024
        </p>
      </div>
    </>
  );
}

export default ContactUs;
