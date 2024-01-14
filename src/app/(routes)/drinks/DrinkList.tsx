import "./DrinkList.scss";
import React, { useEffect, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { TMenuItemDrink } from "../../../interfaces/menuItem";
import { ListItem } from "../../components/ListItem";
import { useFetchFromSupabase } from "../../hooks/useFetchFromSupabase";
import { getImageByNameFromBucket } from "../../../services/api-service";
import FilterChips from "../../components/FilterChips";

const DrinkList: React.FC = () => {
	const [drinks, setDrinks] = useState<TMenuItemDrink[]>([]);
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const menuContext = React.useContext(MenuContext);
	const drinksResponse = useFetchFromSupabase<TMenuItemDrink>("drinks");

	if (!menuContext) {
		return <p>menuContext not found</p>;
	}

	useEffect(() => {
		if (drinksResponse.data) {
			setDrinks(drinksResponse.data);
		}
	}, [drinksResponse]);

	const filteredDrinks = drinks.filter(drink => selectedFilters.every(filter => drink.labels?.includes(filter)));

	return (
		<div className="drinkList">
			<FilterChips selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
			<div className="menuItems">
				{filteredDrinks.length > 0 &&
					filteredDrinks.map((drink: TMenuItemDrink) => {
						const imageUrl = getImageByNameFromBucket("images", drink.imageName);

						return <ListItem key={drink.id} listItem={drink} imageUrl={imageUrl} />;
					})}
			</div>
		</div>
	);
};

export default DrinkList;