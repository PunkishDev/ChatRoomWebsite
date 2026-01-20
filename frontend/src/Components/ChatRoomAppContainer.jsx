import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ChatBarComponent from "./ChatBarComponent";

export default function ChatRoomAppContainer() {
  const navigate = useNavigate();
  //User login state
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
  //Message Box State
  const [chatBox, setChatBox] = useState({
    message: "",
  });

  //UseEffects
  //Checking if user is logged in on mount
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

  //Message Bar handlers -----------------
  //Handle changing of message in the chat bar
  const handleOnMessageChange = (e) => {
    setChatBox((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };
  //Handle on chat submit
  const handleOnChatSubmit = (e) => {
    e.preventDefault();
  };

  // For live chat updates look into WebSockets

  return (
    <div>
      <h1>Chat Room Home</h1>
      <button onClick={() => handleOnLogout()}>Logout</button>
      <ChatBarComponent
        user={user}
        messageBox={chatBox}
        handleOnMessageChange={handleOnMessageChange}
        handleOnChatSubmit={handleOnChatSubmit}
      />
    </div>
  );
}
