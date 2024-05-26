import Login from "./pages/Login";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
import Profile from "./pages/Profile";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import Signin from "./pages/Signin";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import News from "./pages/News";
import AddRoutes from "./pages/AddRoutes";
import ContactUs from "./pages/ContactUs";
import HomePage from "./pages/HomePage";
import { AddisTransportProvider } from "./Context/AddisTransportContext";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "feedback",
        element: <Feedback />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "news",
        element: <News />,
      },

      {
        path: "addroute",
        element: <AddRoutes />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AddisTransportProvider>
      <RouterProvider router={routers} />;
    </AddisTransportProvider>
  );
}

export default App;
