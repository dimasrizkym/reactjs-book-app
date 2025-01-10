import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import Card from "../components/Card";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Input from "../components/Input";

const EditProfile = () => {
  const { user, updateUser } = useUser();
  const [username, setUsername] = useState(user.username);

  const handleSave = () => {
    if (username.trim() === "") {
      alert("Username cannot be empty!");
      return;
    }

    if (user.username === username) {
      alert("Username cannot be the same as the previous one!");
      return;
    }

    const updatedUser = { username };
    let updateUserConfirmed = confirm(
      `Are you sure you want to update your profile name to ${updatedUser.username}? `
    );
    if (updateUserConfirmed) {
      updateUser(updatedUser);
      alert("Profile updated successfully!");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen-custom flex flex-col items-center justify-between">
        <div className="w-full max-w-3xl mx-auto p-6">
          <Card>
            <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Edit Profile
            </h1>
            <Input
              type="text"
              placeholder="Enter new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-6"
            />
            <Button onClick={handleSave} variant="primary" fullWidth={true}>
              Save
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default EditProfile;
