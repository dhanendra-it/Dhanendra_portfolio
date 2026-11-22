import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes";
import { useState, useEffect } from "react";
import Nav from "./components/pages/Nav";
import GearLoader from "./components/GearLoader";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme on startup
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <GearLoader />
      <BrowserRouter>
        <Nav toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
