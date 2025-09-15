import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  return (
    <div className="flex justify-between bg-green-100">
      <img className="w-40 h-30" src={LOGO_URL} />
      <nav className="flex items-center">
        <ul className="flex p-4 m-4 gap-5">
          <li>Online Status : {onlineStatus === true ? "✅" : "🔴"} </li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
           <li><Link to="/grocery">Grocery</Link></li>
          <li>Cart</li>
          <button className="login" onClick={() => {
            btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
          }}>{btnName}</button>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
