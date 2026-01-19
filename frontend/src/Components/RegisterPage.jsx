import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import UserFormComponent from "./UserFormComponent";
export default function RegisterPage() {
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
    handleOnRegister();
  };

  const handleOnRegister = async () => {
    const result = await axios.post("http://localhost:3000/register", formData);
    setPostResponse(result.data.message);
    if (result.status === 201) {
      navigate("/"); //Navigate back to login
    }
  };

  return (
    <div>
      <h1>Register New User</h1>
      <p>{postResponse}</p>
      <UserFormComponent
        formData={formData}
        handleOnFormChange={handleOnFormChange}
        handleOnFormSubmit={handleOnFormSubmit}
      />
      <Link to="/">Back to Login</Link>
    </div>
  );
}
