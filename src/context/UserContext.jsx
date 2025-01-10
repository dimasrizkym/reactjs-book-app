import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("auth");
    return savedUser ? JSON.parse(savedUser) : { username: "Guest" };
  });

  const updateUser = (newUser) => {
    if (newUser && typeof newUser === "object") {
      setUser(newUser);
      localStorage.setItem("auth", JSON.stringify(newUser));
    } else {
      console.error("Invalid user data:", newUser);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
