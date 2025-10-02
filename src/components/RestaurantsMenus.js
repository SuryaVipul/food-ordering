import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantsData from "../utils/useRestaurantsData";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantsMenus = () => {
  const { resId } = useParams();
  console.log(resId);

  const restInfo = useRestaurantsData(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (restInfo === null) {
    return <Shimmer />;
  }
  const { name, costForTwoMessage, areaName, city } =
    restInfo?.cards[2]?.card?.card?.info;
  // const {itemCards} = restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card;
  const { title } =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card;
  const { itemCards } =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card;

  // Filter categories
  const filterCategories =
    restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = filterCategories.filter(
    (c) =>
      c.card?.["card"]?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  //console.log(categories);

  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p>
        <b> {costForTwoMessage}</b>
      </p>
      <p>
        {areaName}, {city}
      </p>
      {/* categories accordians */}
      {categories.map((category, index) => (
        // controlled component by it's parent
        <RestaurantCategory
          key={category?.card?.card.title}
          data={category?.card?.card}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantsMenus;
