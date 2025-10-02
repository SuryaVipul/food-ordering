import RestaurantCard from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

const Body = () => {
  const [listOfRestaurants, setlistOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    fetchData();
    // loadData();
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

  // const loadData = async () => {
  //   const postData = {
  //     lat: 19.1963,
  //     lng: 72.9675,
  //     nextOffset: "CJhlELQ4KIDA+/CXnZaITTCnEzgE",
  //     widgetOffset: {
  //       NewListingView_category_bar_chicletranking_TwoRows: "",
  //       NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
  //       Restaurant_Group_WebView_SEO_PB_Theme: "",
  //       collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "9",
  //       inlineFacetFilter: "",
  //       restaurantCountWidget: "",
  //     },
  //     filters: {},
  //     seoParams: {
  //       seoUrl: "https://www.swiggy.com/restaurants",
  //       pageType: "FOOD_HOMEPAGE",
  //       apiName: "FoodHomePage",
  //       businessLine: "FOOD",
  //     },
  //     page_type: "DESKTOP_WEB_LISTING",
  //     _csrf: "Af00IbFdKNmM-eflJCJNHlH0XhsfScp8oW2bBYfE",
  //   };
  //   try {
  //     const res = await fetch(
  //       "https://www.swiggy.com/dapi/restaurants/list/update",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(postData),
  //       }
  //     );

  //     const json = await res.json();
  //     console.log(
  //       "loadData:: ",
  //       json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //     setlistOfRestaurants(
  //       json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //     setFilteredRestaurants(
  //       json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //   } catch (error) {
  //     console.log("Error while loading data: ", error);
  //   }
  // };

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

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="px-4 py-4 mx-4 my-4">
        <input
          className="border-2"
          type="text"
          value={searchValue}
          onChange={handleChange}
        ></input>
        <button
          className="px-2 mx-2 border-2 rounded-b-sm bg-gray-200"
          onClick={() => {
            const searchRestaurant = listOfRestaurants.filter((res) =>
              res.info.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredRestaurants(searchRestaurant); //  update and displayed list
          }}
        >
          Search
        </button>
        <button
          className="px-2 mx-2 border-2 rounded-b-sm bg-gray-200"
          onClick={() => {
            const filterRestaurants = listOfRestaurants.filter((res) => {
              return res?.info?.avgRating > 4;
            });
            setFilteredRestaurants(filterRestaurants);
          }}
        >
          Top Rated Restorents
        </button>
        <label>UserName: </label>
        <input
          className="border border-black p-2"
          value={loggedInUser}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className=" flex flex-wrap gap-4">
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
