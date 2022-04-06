import React, { useEffect } from "react";
import Header from "./components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { whatToShow } from "./redux/slices/whatIsSelectedSlice";
import "./App.css";
import DetailsTable from "./components/detailsTable/DetailsTable";
import HomeTable from "./components/homeTable/HomeTable";
import FavoritesTable from "./components/favoritesTable/FavoritesTable";
import { addSymbol, updateSymbol } from "./redux/slices/initialTableSlice";
import { addFavoriteName } from "./redux/slices/favoritesSlice";

function App() {
	const dispatch = useDispatch();
	const whatToShowState = useSelector((state) => state.whatToShow);

	const whatToShowFunction = (text) => dispatch(whatToShow(text));
	let showMe = <HomeTable whatToShowFunction={whatToShowFunction} />;
	switch (whatToShowState.page) {
		case "HOME":
			showMe = <HomeTable whatToShowFunction={whatToShowFunction} />;
			break;
		case "FAVORITES":
			showMe = <FavoritesTable whatToShowFunction={whatToShowFunction} />;
			break;
		case "DETAILS":
			showMe = <DetailsTable />;
			break;
		default:
			break;
	}

	useEffect(() => {
		async function kotao() {
			let symbolArray = [];
			await fetch("/v1/symbols")
				.then((res) => res.json())
				.then((json) =>
					json
						.slice(0, 5)
						.forEach((item) =>
							symbolArray.push("t" + item.toUpperCase())
						)
				);
			symbolArray.forEach((symbol) => {
				const w = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
				let onlyFirstRenderFlag = false;
				let isFavoriteFlag = false;
				let symbolName, id;
				let storage = false;
				if (window.localStorage.length) {
					storage = window.localStorage
						.getItem("favorites")
						.split(",");
				}
				w.onmessage = (msg) => {
					let x = JSON.parse(msg.data);
					if (x.event === "info") return;
					if (x.event === "subscribed") {
						symbolName = x.pair;
						id = x.chanId;
						if (storage === false) return;
						if (storage.includes(symbolName)) {
							dispatch(addFavoriteName(symbolName));
							isFavoriteFlag = true;
						}
						return;
					}
					if (x[1] === "hb") return;
					if (!onlyFirstRenderFlag) {
						onlyFirstRenderFlag = true;
						dispatch(
							addSymbol({
								name: symbolName,
								last: x[1][6],
								change: x[1][4],
								changePercent: x[1][5],
								high: x[1][8],
								low: x[1][9],
								isFavorite: isFavoriteFlag,
								id: id,
							})
						);
						return;
					}
					dispatch(
						updateSymbol({
							name: symbolName,
							last: x[1][6],
							change: x[1][4],
							changePercent: x[1][5],
							high: x[1][8],
							low: x[1][9],
						})
					);
				};
				let msg = JSON.stringify({
					event: "subscribe",
					channel: "ticker",
					symbol: symbol,
				});
				w.onopen = (e) => w.send(msg);
			});
		}
		kotao();
	}, []);

	return (
		<>
			<Header whatToShowFunction={whatToShowFunction} />
			{showMe}
		</>
	);
}

export default App;
