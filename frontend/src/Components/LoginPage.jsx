import { useState } from "react";
import axios from "axios";
import UserFormComponent from "./UserFormComponent";
import Cookie from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const navigate = useNavigate();

  //Handlers
  const handleOnFormChange = (e) => {
    setFormData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
  };

  const handleOnFormSubmit = (e) => {
    e.preventDefault();
    handleOnLogin();
  };

  const handleOnLogin = async () => {
    try {
      const result = await axios.post("http://localhost:3000/login", formData);
      setPostResponse(result.data.message);

      if (result.status === 201) {
        Cookie.set("user-auth", result.data.token);
        navigate("/chat");
      }
    } catch (error) {
      setPostResponse(error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <p>{postResponse}</p>
      <UserFormComponent
        formData={formData}
        handleOnFormChange={handleOnFormChange}
        handleOnFormSubmit={handleOnFormSubmit}
      />
      <p>
        Don't have an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
}
