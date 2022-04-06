import React from "react";
import { useSelector } from "react-redux";

export default function FavoritesTable({ whatToShowFunction }) {
	const Data = useSelector((state) => state.initialTable.symbolData);
	let DATA = [];

	Data.forEach((element) => {
		if (element.isFavorite === false) return;
		DATA.push(
			<tr key={element.id}>
				<td>
					<button
						onClick={() =>
							whatToShowFunction({
								...element,
								page: "DETAILS",
							})
						}
					>
						{element.name}
					</button>
				</td>
				<td>{element.last}</td>
				<td>{element.change}</td>
				<td>{element.changePercent}%</td>
				<td>{element.high}</td>
				<td>{element.low}</td>
			</tr>
		);
	});
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Last</th>
					<th>Change</th>
					<th>Change Percent</th>
					<th>High</th>
					<th>Low</th>
				</tr>
			</thead>
			<tbody>{DATA}</tbody>
		</table>
	);
}
