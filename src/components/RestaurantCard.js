import { IMG_CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { restData } = props;

  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    sla,
  } = restData?.info;

  return (
    <div className="background bg-gray-200">
      <img
        className="res-logo"
        alt="res-logo"
        src={IMG_CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-xl font-bold">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo} FOR TWO</h4>
      <h4>{sla.slaString}</h4>
    </div>
  );
};

export default RestaurantCard;
