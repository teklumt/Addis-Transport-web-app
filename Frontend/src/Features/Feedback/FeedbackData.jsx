import { MdDeleteForever } from "react-icons/md";
import { useAddisTransportContext } from "../../Context/AddisTransportContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function FeedbackData() {
  const {
    user,
    feedbacks,
    setFeedbacks,
    allUsers,
    adminStatus,
    setAdminStatus,
  } = useAddisTransportContext();

  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  const { register, handleSubmit, reset } = useForm();
  // console.log(user);

  const handleSubmitFeedback = async (data) => {
    const myPromise = axios.post(`http://localhost:8080/feedback/`, {
      userId: user.id,
      message: data.message,
    });

    axios.get("http://localhost:8080/feedback/getAll").then((res) => {
      setFeedbacks(res.data);
    });

    toast.promise(
      myPromise,
      {
        loading: "Sending...",
        success: "Feedback sent successfully",
        error: "Failed to send feedback",
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
      const response = await myPromise;
      setFeedbacks((prevFeedbacks) => [...prevFeedbacks, response.data]);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/feedback/${id}`);

      setFeedbacks(feedbacks?.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const newFilteredFeedbacks = feedbacks?.reduce(
      (acc, item) => {
        let users;
        if (!adminStatus) {
          users = allUsers?.find(
            (userx) => userx.id === item.userId && userx.id === user.id,
          );
        } else {
          users = allUsers?.find((user) => user.id === item.userId);
        }

        if (users) {
          acc.push({
            id: item.id,
            name: users.name,
            email: users.email,
            feedback: item.message,
            userId: item.userId,
          });
        }

        return acc;
      },
      [feedbacks, adminStatus, user?.id],
    );

    setFilteredFeedbacks(newFilteredFeedbacks);
  }, [feedbacks, allUsers, adminStatus, user?.id]);

  // console.log(user);
  // console.log(filteredFeedbacks);

  return (
    <div>
      {!adminStatus ? (
        <>
          <div>
            <div className=" mx-auto mt-5 px-10 sm:w-[500px]">
              <h1 className="mb-5 text-center text-2xl font-bold text-gray-700">
                Thank's for Your feedback
              </h1>

              <form onSubmit={handleSubmit(handleSubmitFeedback)}>
                <div>
                  <input
                    className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name . . ."
                    {...register("name", { required: true })}
                  />
                </div>
                <div>
                  <input
                    className="mt-2 w-full rounded-md border-2 border-gray-300 p-2 outline-none"
                    type="email"
                    id="Email"
                    name="email"
                    placeholder="Your Email . . ."
                    {...register("email", { required: true })}
                  />
                </div>
                <div>
                  <textarea
                    className="mt-2 h-[150px] w-full rounded-md border-2 border-gray-300 p-2 outline-none"
                    name="message"
                    {...register("message", { required: true })}
                  ></textarea>
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
          <div>
            <div>
              {filteredFeedbacks?.length > 3 && (
                <h1 className="mb-10 mt-10 text-center text-lg font-semibold">
                  Your Earlier Feedbacks
                </h1>
              )}
              {filteredFeedbacks?.length > 0 ? (
                <div className="ml-5 flex flex-wrap gap-5">
                  {filteredFeedbacks?.map(
                    (item, index) =>
                      index >= 3 && (
                        <div
                          key={index}
                          className="relative mb-10 rounded border border-gray-200 bg-white p-4 pt-6 shadow-lg"
                        >
                          <button
                            className="absolute right-1 top-1 text-yellow-600"
                            onClick={() => deleteItem(item?.id)}
                          >
                            <MdDeleteForever />
                          </button>
                          <div className="flex items-center">
                            <img
                              className="mr-5 h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                              src="../../public/img/avatars/avatar2.png"
                              alt="non"
                            />
                            <div>
                              <p className="mb-2 text-lg font-semibold">
                                {item?.name}
                              </p>
                              <p className="mb-2 text-lg text-gray-500">
                                {item?.email}
                              </p>
                            </div>
                          </div>
                          <p className="mb-2 text-lg ">{item?.feedback}</p>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                <div className="mx-auto mt-10 flex  h-full items-center justify-center px-32">
                  <h1 className=" text-center font-mono text-2xl  text-slate-400">
                    Give Your First Feedback
                  </h1>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="mb-5 mt-3 text-center text-2xl font-bold text-gray-700">
            Feedback Data
          </h1>
          {feedbacks?.length > 0 ? (
            <div className="ml-5 flex flex-wrap gap-5">
              {filteredFeedbacks?.map(
                (item, index) =>
                  index >= 3 && (
                    <div
                      key={index}
                      className="relative mb-10 rounded border border-gray-200 bg-white p-4 pt-6 shadow-lg"
                    >
                      <button
                        className="absolute right-1 top-1 text-yellow-600"
                        onClick={() => deleteItem(item.id)}
                      >
                        <MdDeleteForever />
                      </button>
                      <div className="flex items-center">
                        <img
                          className="mr-5 h-10 w-10 rounded-full border-2 border-gray-300 object-cover"
                          src="../../public/img/avatars/avatar2.png"
                          alt="non"
                        />
                        <div>
                          <p className="mb-2 text-lg font-semibold">
                            {item.name}
                          </p>
                          <p className="mb-2 text-base text-gray-500">
                            {item.email}
                          </p>
                        </div>
                      </div>
                      <p className="mb-2 text-base text-gray-700 ">
                        {item.feedback}
                      </p>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <div className="mx-auto flex h-full  items-center justify-center p-32">
              <h1 className=" text-center font-mono text-2xl  text-slate-400">
                No Feedback Data
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FeedbackData;
