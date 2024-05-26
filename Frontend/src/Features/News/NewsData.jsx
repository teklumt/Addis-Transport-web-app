import { useEffect, useState } from "react";
import axios from "axios";
import { useAddisTransportContext } from "../../Context/AddisTransportContext";

import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function NewsData() {
  const { adminStatus, setAdminStatus } = useAddisTransportContext();
  const [news, setNews] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axios.get("http://localhost:8080/news/getAll").then((response) => {
      setNews(response.data);
    });
  }, []);

  const handlePostnews = async (data) => {
    console.log(data);
    const myPromise = axios.post("http://localhost:8080/news/add", {
      title: data.title,
      body: data.body,
      tag: data.tag,
    });
    try {
      await myPromise;
      reset();
      toast.success("News posted successfully");
      axios.get("http://localhost:8080/news/getAll").then((response) => {
        setNews(response.data);
      });
    } catch (error) {
      toast.error("Failed to post news");
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="my-4 text-center text-3xl font-bold">News</h1>
        {adminStatus && (
          <div>
            <form onSubmit={handleSubmit(handlePostnews)}>
              <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                <input
                  type="text"
                  placeholder="Title"
                  className="mb-2 w-[300px] border border-gray-200 p-2"
                  {...register("title", { required: true })}
                />
                <input
                  placeholder="Body"
                  className="mb-2  w-[300px] border border-gray-200 p-2 lg:w-[380px]"
                  {...register("body", { required: true })}
                />
                <div className="">
                  <select
                    className="mb-2   border border-gray-200 bg-white p-[9.5px] shadow"
                    {...register("tag", { required: true })}
                  >
                    <option value="Sport">Sport</option>
                    <option value="Politics">Politics</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                  <button
                    type="submit"
                    className="w-[80px] bg-black  p-[9.5px] text-white"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-around">
        {news.map((newsItem) => (
          <div
            className="my-4 flex max-w-sm flex-col rounded-md border border-gray-200 bg-white p-4 shadow-md"
            key={newsItem.id}
          >
            <h2 className="mb-2 text-xl font-bold text-black">
              {newsItem.title}
            </h2>
            <p className="flex-grow text-base text-gray-700">{newsItem.body}</p>
            <div className="flex items-center justify-between">
              <p className="mt-2 text-sm text-yellow-500">#{newsItem.tag}</p>
              <div className="flex items-center gap-3">
                <BiSolidLike className="text-yellow-600" />
                <BiSolidDislike />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsData;
