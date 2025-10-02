// ...existing code...
import { useState } from "react";
import IntemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  const itemCards = data?.itemCards ?? [];
  const title = data?.title ?? "Category";

  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-lg">
            {title} ({itemCards.length})
          </span>
          <span>{showItems ? "⬆️" : "⬇️"}</span>
        </div>

        {showItems && itemCards.length > 0 && <IntemList items={itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
// ...existing code...
