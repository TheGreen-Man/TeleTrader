import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/slices/isLoggedInSlice";

export default function Header({ whatToShowFunction }) {
	const dispatch = useDispatch();
	const whatToShowState = useSelector((state) => state.whatToShow);

	const logInFunction = () => dispatch(logIn(true));
	const logInState = useSelector((state) => state.logIn);
	return (
		<header>
			<button
				className={
					whatToShowState.page === "HOME" ? "btn btnActive" : "btn"
				}
				onClick={(e) =>
					whatToShowFunction({
						id: null,
						page: e.target.innerText.toUpperCase(),
					})
				}
			>
				Home
			</button>
			{logInState && (
				<button
					className={
						whatToShowState.page === "FAVORITES"
							? "btn btnActive"
							: "btn"
					}
					onClick={(e) =>
						whatToShowFunction({
							page: e.target.innerText.toUpperCase(),
						})
					}
				>
					Favorites
				</button>
			)}
			{!logInState && (
				<button id="logIn" onClick={logInFunction}>
					Login
				</button>
			)}
		</header>
	);
}
