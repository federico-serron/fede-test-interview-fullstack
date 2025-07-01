import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">FedeTest</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Inicio</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Login</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Pricing</a>
						</li>
						<li class="nav-item">
							<a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
