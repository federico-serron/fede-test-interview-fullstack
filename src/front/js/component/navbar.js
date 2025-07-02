import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from 'react-toastify';


export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogout = async () => {

		const resp = await actions.logout()

		if (resp) {
			setIsLoggedIn(false)
			toast.success("Logged out successfully")
			navigate('/')
			return

		} else {
			toast.error(store.message)
			return
		}
	}

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem("token"))
	}, [])

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light ">
			<div className="container-fluid">
				<Link className="navbar-brand" to={'/'}>FedeTest</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="/">Inicio</a>
						</li>
						{!localStorage.getItem("token") ? (
							<>
								<li className="nav-item">
									<Link to={'/auth/login'} className="nav-link">Login</Link>
								</li>
								<li className="nav-item">
									<Link to={'/auth/signup'} className="nav-link text-success">SignUp</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link to={'/dashboard'} className="nav-link text-success">Add Tasks</Link>
								</li>
								<li className="nav-item">
									<div className="nav-link text-danger cursor-pointer border-0" role="button" onClick={handleLogout}>Log out</div>
								</li>
							</>
						)}


					</ul>
				</div>
			</div>
		</nav>
	);
};
