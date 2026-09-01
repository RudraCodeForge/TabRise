import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import Home from "./Pages/Home";
import { getQuote } from "./Services/GetQuotes.service";

function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  /* const quote = {
    q: "Life is from the inside out. When you shift on the inside, life shifts on the outside.",
    a: "Kamal Ravikant",
  };
  const fetchQuote = () => {
    console.log("Fetching quote...");
  };
*/
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    try {
      const data = await getQuote();
      setQuote(data);
    } catch (error) {
      console.error("Quote Error:", error);
    }
  };

  useEffect(() => {
    if (userName) {
      fetchQuote();
    }
  }, [userName]);

  if (!userName) {
    return <Welcome setUserName={setUserName} />;
  }

  return (
    <>
      <Navbar onRefresh={fetchQuote} />

      <Routes>
        <Route
          path="/"
          element={<Home quote={quote} onRefresh={fetchQuote} />}
        />
      </Routes>
    </>
  );
}

export default App;
