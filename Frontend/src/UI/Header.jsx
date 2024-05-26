import { IoIosNotificationsOutline } from "react-icons/io";
import { useAddisTransportContext } from "../Context/AddisTransportContext";
import { Link } from "react-router-dom";

function Header() {
  const { smallscreen, setSmallscreen } = useAddisTransportContext();
  return (
    <div className="flex justify-between bg-slate-100 p-3">
      <div>
        {smallscreen && (
          <p className="mt-2 text-xl text-slate-400">Addis Transport</p>
        )}
      </div>
      <div className="flex items-center gap-10">
        <IoIosNotificationsOutline size={30} className="" />
        <Link to={"/home/profile"}>
          <img
            className="mr-5 h-10 w-10 rounded-full object-cover"
            src="../../public/img/avatars/avatar5.png"
            alt="non"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
