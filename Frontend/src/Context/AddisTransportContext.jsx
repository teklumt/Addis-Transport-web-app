import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AddisTransportContext = createContext();

function AddisTransportProvider({ children }) {
  const [smallscreen, setSmallscreen] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [history, setHistory] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSmallscreen(true);
      } else {
        setSmallscreen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/bus/getAll").then((res) => {
      setRoutes(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/histories/getAll").then((res) => {
      setHistory(res.data);
    });
  }, [user, history]);

  useEffect(() => {
    axios.get("http://localhost:8080/user/getAll").then((res) => {
      setTotalUsers(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/feedback/getAll").then((res) => {
      setFeedbacks(res.data);
    });
  }, [user, feedbacks]);

  useEffect(() => {
    axios.get("http://localhost:8080/user/getAll").then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/user/getAll").then((res) => {
  //     const fetchedUser = res.data.find((user) => user.id === 1);
  //     setUser(fetchedUser);
  //   });
  // }, []);

  const contextValue = {
    smallscreen,
    setSmallscreen,

    adminStatus,
    setAdminStatus,

    user,
    setUser,

    routes,
    setRoutes,

    history,
    setHistory,

    totalUsers,
    setTotalUsers,

    feedbacks,
    setFeedbacks,

    allUsers,
    setAllUsers,
  };

  return (
    <AddisTransportContext.Provider value={contextValue}>
      {children}
    </AddisTransportContext.Provider>
  );
}

function useAddisTransportContext() {
  return useContext(AddisTransportContext);
}

export { AddisTransportProvider, useAddisTransportContext };
