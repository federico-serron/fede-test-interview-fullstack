import React, { useEffect, useState, useContext } from 'react'
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Context } from "../store/appContext";


const Signup = () => {

    const { store, actions } = useContext(Context);

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userName.length < 4 || password.length < 4) {
            toast.info("User and Password must be at least 4 characters long")
            return
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.info("Email has not a valid format")
            return;
        }

        setLoading(true)
        const resp = await actions.register(userName, email, password)

        if (resp) {
            toast.success(store.message)
            navigate('/auth/login')
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
            <h2>Registrate</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="name" required onChange={(e) => { setUserName(e.target.value) }} value={userName} />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" required onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>
                <div className="mb-3">
                    <label for="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pass" required onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>

                <button type="submit" className={"btn btn-success"} disabled={loading}>{loading ? "Loading..." : "Sign Up!"}</button>
            </form>

        </div>
    )
}

export default Signup;