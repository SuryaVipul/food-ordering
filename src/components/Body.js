import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1 assignment assign to me - use update api from swiggy app that will do later
  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1963&lng=72.9675&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      // optional chaining in javascript
      console.log(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setlistOfRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredRestaurants(
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.log("Error Fetching data:", error);
    }
  };

  // Using of Shimmer Ui
  // this is conditional rendering in react
  // if(listOfRestaurants.length === 0) {
  //   return <Shimmer />
  // }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>look like you are offline, please check your internet connection!</h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter-restro">
        <input type="text" value={searchValue} onChange={handleChange}></input>
        <button
          onClick={() => {
            const searchRestaurant = listOfRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredRestaurants(searchRestaurant);
          }}
        >
          Search
        </button>
        <button
          className="search-restorent"
          onClick={() => {
            const filterRestaurants = listOfRestaurants.filter((res) => {
              return res?.info?.avgRating > 4;
            });
            setlistOfRestaurants(filterRestaurants);
          }}
        >
          Top Rated Restorents
        </button>
      </div>
      <div className="res-conatiner">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard restData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
