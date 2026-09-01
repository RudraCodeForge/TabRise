import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import Home from "./Pages/Home";
import { getQuote } from "./Services/GetQuotes.service";

function App() {
  const [userName, setUserName] = useState(() =>
    localStorage.getItem("userName"),
  );
  const [quote, setQuote] = useState(null);
  const [favouriteQuotes, setFavouriteQuotes] = useState(() => {
    try {
      const storedFavourites = JSON.parse(
        localStorage.getItem("favourites") || "[]",
      );
      return Array.isArray(storedFavourites) ? storedFavourites : [];
    } catch (error) {
      return [];
    }
  });

  const fetchQuote = async () => {
    try {
      const data = await getQuote();
      setQuote(data);
    } catch (error) {
      console.error("Quote Error:", error);
      setQuote({
        q: "Life is from the inside out. When you shift on the inside, life shifts on the outside.",
        a: "Kamal Ravikant",
      });
    }
  };

  const addFavourite = (quoteToSave) => {
    if (!quoteToSave?.q || !quoteToSave?.a) return;

    setFavouriteQuotes((previous) => {
      const alreadyExists = previous.some(
        (item) => item.q === quoteToSave.q && item.a === quoteToSave.a,
      );

      const nextFavourites = alreadyExists
        ? previous
        : [...previous, quoteToSave];
      localStorage.setItem("favourites", JSON.stringify(nextFavourites));
      return nextFavourites;
    });
  };

  const copyQuote = async (quoteToCopy) => {
    if (!quoteToCopy?.q || !quoteToCopy?.a) return;

    const textToCopy = `"${quoteToCopy.q}" — ${quoteToCopy.a}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Copy failed:", error);
      window.prompt("Copy this quote:", textToCopy);
    }
  };

  const shareQuote = async (quoteToShare) => {
    if (!quoteToShare?.q || !quoteToShare?.a) return;

    const shareText = `"${quoteToShare.q}" — ${quoteToShare.a}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "TabRise Quote",
          text: shareText,
        });
        return;
      }

      await navigator.clipboard.writeText(shareText);
      window.alert(
        "Quote copied because this device does not support native sharing.",
      );
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
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
      <Navbar onRefresh={fetchQuote} favouriteCount={favouriteQuotes.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              quote={quote}
              onRefresh={fetchQuote}
              onFavourite={addFavourite}
              onCopyQuote={copyQuote}
              onShareQuote={shareQuote}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
