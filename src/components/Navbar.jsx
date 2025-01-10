import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { handleDarkModeChange } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const themeOptions = [
    { label: "Dark Mode", onClick: () => handleDarkModeChange("dark") },
    { label: "Light Mode", onClick: () => handleDarkModeChange("light") },
    { label: "OS Theme", onClick: () => handleDarkModeChange("system") },
  ];

  const userOptions = [
    { label: "Edit Profile", onClick: () => navigate("/edit-profile") },
    { label: "Logout", onClick: handleLogout },
  ];

  return (
    <nav className="w-full shadow-lg bg-white dark:bg-gray-900 shadow p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex items-center justify-center space-x-8">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Book Apps
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-gray-900 dark:text-white hover:text-blue-500"
            >
              Home
            </Link>
          </div>
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <Dropdown
            label={localStorage.getItem("darkMode") || "System"}
            options={themeOptions}
          />
          <Dropdown label={user.username} options={userOptions} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-15 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg px-4 py-8 flex flex-col space-y-5">
          <Link
            to="/"
            className="text-gray-900 dark:text-white hover:text-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div className="w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Dropdown
              label={localStorage.getItem("darkMode") || "System"}
              options={themeOptions}
            />
            <Dropdown label={user.username} options={userOptions} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
