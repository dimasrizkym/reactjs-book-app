import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useUser } from "../context/UserContext";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "1") {
      const newUser = { username };
      updateUser(newUser);
      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 py-6">
      <div className="max-w-3xl mx-auto p-6">
        <Card>
          <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="space-y-3 mb-6">
              <Input type="text" name="username" placeholder="Username" />
              <Input type="password" name="password" placeholder="Password" />
            </div>
            <Button type="submit" variant="primary" fullWidth={true}>
              Login
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
