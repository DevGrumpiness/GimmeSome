"usec client";
import { TMenuItemDrink, TMenuItemFood } from "../../interfaces/menuItem";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ListItemProps {
	listItem: TMenuItemDrink | TMenuItemFood;
}

export const ListItem: React.FC<ListItemProps> = ({ listItem }) => {
	if (!listItem) {
		return;
	}

	const router = useRouter();

	const imageUrl = listItem.imageUrl ?? "/media/70x70.png";
	const handleListItemClick = () => {
		if (listItem.type === "food") {
			router.push(`/food/${listItem.id}`);
		} else {
			router.push(`/drinks/${listItem.id}`);
		}
	};

	return (
		<button className="menuItem" onClick={handleListItemClick}>
			<Image src={imageUrl} alt={listItem.name} width={70} height={70} />
			<div className={`content ${!listItem.available && "disabled"}`}>
				<h3>{listItem.name}</h3>
				<span> {listItem.description} </span>
				<span> {listItem.label} </span>
			</div>
		</button>
	);
};

export default ListItem;
