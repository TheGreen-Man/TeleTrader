import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addFavoriteName,
	removeFavoriteName,
} from "../../redux/slices/favoritesSlice";
import { toggleFavorite } from "../../redux/slices/initialTableSlice";

export default function DetailsTable() {
	const selectedSymbol = useSelector((state) => state.whatToShow);
	const logInState = useSelector((state) => state.logIn);
	const favoriteList = useSelector((state) => state.favoriteList);

	const [isFav, setFav] = useState(selectedSymbol.isFavorite);
	const dispatch = useDispatch();

	const handleClick = () => {
		setFav(!isFav);
		dispatch(toggleFavorite({ name: selectedSymbol.name }));
		if (isFav === false) dispatch(addFavoriteName(selectedSymbol.name));
		else dispatch(removeFavoriteName(selectedSymbol.name));
	};

	useEffect(() => {
		window.localStorage.setItem("favorites", favoriteList);
	}, [favoriteList]);

	const showSelectedSymbol = (
		<tr>
			<td>{selectedSymbol.name}</td>
			<td>{selectedSymbol.last}</td>
			<td>{selectedSymbol.high}</td>
			<td>{selectedSymbol.low}</td>
		</tr>
	);
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Symbol</th>
						<th>Last Price</th>
						<th>High</th>
						<th>Low</th>
					</tr>
				</thead>
				<tbody>{showSelectedSymbol}</tbody>
			</table>
			{logInState && (
				<button
					className={isFav ? "isFav" : "notFav"}
					onClick={() => handleClick()}
				>
					{isFav ? "Remove Favorite" : "Add Favorite"}
				</button>
			)}
		</>
	);
}
