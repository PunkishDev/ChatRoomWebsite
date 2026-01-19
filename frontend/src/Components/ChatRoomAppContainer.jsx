import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function ChatRoomAppContainer() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const token = Cookies.get("user-auth");
    if (!token) {
      return "";
    }

    try {
      const decoded = jwtDecode(token);
      return decoded.username;
    } catch {
      return "";
    }
  });

  //UseEffects
  useEffect(() => {
    if (!user) {
      return navigate("/not-authorized");
    }
  }, []);

  //Handlers
  //User Logout Handler
  const handleOnLogout = () => {
    Cookies.remove("user-auth");
    navigate("/");
  };

  // For live chat updates look into WebSockets

  return (
    <div>
      <h1>Chat Room Home</h1>
      <button onClick={() => handleOnLogout()}>Logout</button>
    </div>
  );
}
