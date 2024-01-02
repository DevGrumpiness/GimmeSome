interface MenuItem {
	id: number;
	name: string;
	shortDescription: string;
	longDescription: string;
	price: number;
	imageName: string | null;
	available: boolean;
}

export type DrinkSubType = "softdrink" | "beer" | "cocktail" | "hot";

export interface TMenuItemFood extends MenuItem {
	label: "veggie" | "vegan" | null;
}

export interface TMenuItemDrink extends MenuItem {
	label: "alcoholic" | "hot" | null;
	subtype?: DrinkSubType;
}

export type FoodResponseType = {
	food: TMenuItemFood[];
};

export type DrinksResponseType = {
	drinks: TMenuItemDrink[];
};
