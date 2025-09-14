import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantsData from "../utils/useRestaurantsData";

const RestaurantsMenus = () => {
  const { resId } = useParams();
  console.log(resId);

  const restInfo = useRestaurantsData(resId);

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
  console.log(itemCards);
  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        <b>{costForTwoMessage}</b>
      </p>
      <p>
        {areaName}, {city}
      </p>
      <h2>{title}</h2>
      <ul>
        {itemCards.map((items) => (
          <li key={items.card.info.id}>
            {items.card.info.name} -{" "}
            <b>
              Rs{" "}
              {items.card.info.price / 100 ||
                items.card.info.defaultPrice / 100}
            </b>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantsMenus;
