"usec client";
import "./ListItem.scss";
import React, { useState, useContext } from "react";

import { CartContext } from "../context/CartContext";
import { TMenuItemDrink, TMenuItemFood } from "../../interfaces/menuItem";
import Image from "next/image";
import ListItemLabels from "./ListItemLabels";

interface ListItemProps {
	listItem: TMenuItemDrink | TMenuItemFood;
	imageUrl: string | null;
}

export const ListItem: React.FC<ListItemProps> = ({ listItem, imageUrl }) => {
	if (!listItem) {
		return;
	}

	const { addToCart, removeFromCart } = useContext(CartContext);

	const [isDetailsOpen, setIsDetailsOpen] = useState(false);

	const handleHeaderClick = () => {
		if (isDetailsOpen) {
			return;
		}
		setIsDetailsOpen(true);
	};

	const handleCloseIconClick = () => {
		setIsDetailsOpen(false);
	};

	const renderLabels = (labelString: string) => {
		return <ListItemLabels labelString={labelString} />;
	};

	const renderPrices = () => {
		return (
			<div className="listItem-header-prices">
				{listItem.prices.map((price, index) => {
					const divider = listItem.variants ? listItem.variants[index].length > 4 ? ".." : "..." : '';
					if (listItem.variants) {
						
						console.log("listItem.variants[index].length", listItem.variants[index].length);
					}
					return (
						<React.Fragment key={price}>
							<div className="price" style={{ paddingLeft: price < 10 ? "4px" : "" }}>
								<span>
									{listItem.variants && listItem.variants.length > 0
										? `${listItem.variants[index]}${divider}`
										: ""}
								</span>
								<span>
									{price.toLocaleString("de-DE", {
										style: "decimal",
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
							</div>
						</React.Fragment>
					);
				})}
			</div>
		);
	};

	return (
		<div id={String(listItem.id)} className={`listItem ${isDetailsOpen ? "expanded" : ""}`}>
			<div className="listItem-header-container" onClick={handleHeaderClick}>
				<Image src={imageUrl ?? ""} alt={listItem.name} width={70} height={70} />
				<div className={`listItem-header-content ${!listItem.available ? "disabled" : ""}`}>
					<div className="listItem-header-name">
						<h3>{listItem.name} <span className="allergens">{listItem.allergenIndexes?.join(', ')}</span></h3>
					</div>
					<span className="shortDescription">
						{listItem.shortDescription}
						<div className={`${!isDetailsOpen && "hidden"}`}>{renderPrices()}</div>
						<div className={`expand ${isDetailsOpen ? "hidden" : ""}`} onClick={handleHeaderClick}>
							<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 512 512">
								<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
							</svg>
						</div>{" "}
					</span>
					<div className={`listItem-details ${!isDetailsOpen ? "hidden" : ""}`}>
						<hr />
						<div className={`labels-container ${!isDetailsOpen ? "hidden" : ""}`}>
							{listItem.label && renderLabels(listItem.label)}
						</div>
					</div>
				</div>
				<div className={`${isDetailsOpen && "hidden"}`}>{renderPrices()}</div>
			</div>
			<div className={`${!isDetailsOpen && "hidden"}`}>{listItem.longDescription}</div>
			<div className="listItem-footer">
				{/* <span onClick={() => addToCart(listItem)} className="addToCart">+</span> */}
				{/* <span onClick={() => removeFromCart(listItem)} className="addToCart">-</span> */}
			</div>
			<div className={`close ${!isDetailsOpen ? "hidden" : ""}`} onClick={handleCloseIconClick}>
				<svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512">
					<path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
				</svg>
			</div>
		</div>
	);
};

export default ListItem;
