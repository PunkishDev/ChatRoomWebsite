import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./Components/NotFoundPage";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import ChatRoomAppContainer from "./Components/ChatRoomAppContainer";
import NotAuthorizedPage from "./Components/NotAuthorizedPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatRoomAppContainer />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
