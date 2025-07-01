import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import bannerImg from "../../img/banner-hero.jpg"
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img src={bannerImg} className="img-fluid mb-2" />
			<h1>Bienvenido a su Administrador de Tareas!</h1>
			<p>
			</p>

		</div>
	);
};
