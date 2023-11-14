import "./App.css";
import NumerologyForm from "./Numerology";
import Astrology from "./Astrology";
import { useEffect, useState } from "react";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // Listen to the popstate event which is triggered by browser navigation
    window.addEventListener("popstate", onLocationChange);

    // Remove event listener on cleanup
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);
  const renderComponent = () => {
    switch (currentPath) {
      case "/astrology":
        return <Astrology />;
      case "/numerology":
        return <NumerologyForm />;
      default:
        return <div>Home</div>;
    }
  };

  return <div className="App">{renderComponent()}</div>;
}

export default App;
