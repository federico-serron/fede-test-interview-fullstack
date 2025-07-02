import React, { useEffect, useState, useContext } from 'react'
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Context } from "../store/appContext";

const Login = () => {

    const { store, actions } = useContext(Context);

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (password.length < 4) {
            toast.info("User and Password must be at least 4 characters long")
            return
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.info("Email has not a valid format")
            return;
        }

        setLoading(true)
        const resp = await actions.login(email, password)

        if (resp) {
            toast.success("Successfully logged in")
            navigate('/dashboard')
        } else {
            toast.error(store.message)
            setLoading(false)
            return
        }
    }


    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/dashboard")
        }
    }, []);

    return (
        <div>
            <h2>Iniciar sesion</h2>

            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>

                <button type="submit" className={"btn btn-success"} disabled={loading}>{loading ? "Loading..." : "Login"}</button>
            </form>

        </div>
    )
}

export default Login;
