import React, { useEffect } from 'react'
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";


const Signup = () => {

    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard")
        }
    }, []);

    return (
        <div>
            <h2>Registrate</h2>

            <form>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="email" className="form-control" id="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass" />
                </div>

                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>

        </div>
    )
}

export default Signup;