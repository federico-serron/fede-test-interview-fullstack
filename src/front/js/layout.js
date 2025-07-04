import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Authentication from "./pages/Authentication.jsx";
import Login from "./component/Login.jsx";
import Signup from "./component/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";



//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";


    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Authentication />} path="/auth" >
                            <Route element={<Login />} path="login" />
                            <Route element={<Signup />} path="signup" />
                        </Route>
                        <Route element={<Dashboard />} path="/dashboard" />
                        <Route element={<h1>Not found!</h1>} path="/*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            <ToastContainer position="top-left" autoClose={2000} />
        </div>
    );
};

export default injectContext(Layout);
