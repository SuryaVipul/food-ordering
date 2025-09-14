import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantsData = (resId) => {
  const [resInfo, setRestInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setRestInfo(json.data);
  };
  return resInfo;
};

export default useRestaurantsData;
