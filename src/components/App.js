import React, { useEffect, useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

const URL = "http://localhost:6001/listings";

function App() {
  const [listings, setListings] = useState([]);

  const [searchString, SetSearchString] = useState("");

  const removeListing = (doomedListingObj) => {
    const newListings = listings.filter((listingObj) => {
      return doomedListingObj.id !== listingObj.id;
    });

    setListings(newListings);

    fetch(`${URL}/${doomedListingObj.id}`, { method: "DELETE" });
  };

  useEffect(() => {
    fetch(URL)
      .then((r) => r.json())
      .then((listingsArray) => setListings(listingsArray));
  }, []);

  const searchListings = listings.filter((listingObj) => {
    return listingObj.description
      .toLowerCase()
      .includes(searchString.toLowerCase());
  });

  return (
    <div className="app">
      <Header setSearchString={SetSearchString} />
      <ListingsContainer
        removeListing={removeListing}
        listings={searchListings}
      />
    </div>
  );
}

export default App;
