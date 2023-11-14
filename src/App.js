import "./App.css";
import NumerologyForm from "./Numerology";
import Astrology from "./Astrology";
import { useEffect, useState } from "react";

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    // Listen to the hashchange event which is triggered by navigating to a new hash
    window.addEventListener("hashchange", onHashChange);

    // Remove event listener on cleanup
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const renderComponent = () => {
    switch (currentHash) {
      case "#/astrology":
        return <Astrology />;
      default:
        return <NumerologyForm />;
    }
  };

  return <div className="App">{renderComponent()}</div>;
}

export default App;
