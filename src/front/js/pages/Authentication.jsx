import React, { useEffect } from 'react'
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";

const Authentication = () => {

    const navigate = useNavigate()

    return (
        <div className='container w-50 px-0 py-2'>
            <Outlet />

        </div>
    )
}

export default Authentication;