import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import TasksList from '../component/TasksList.jsx';
import AddTask from '../component/AddTask.jsx';
import { Context } from "../store/appContext";

const Dashboard = () => {

    const navigate = useNavigate()


    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/auth/login")
        }
    }, []);


    return (
        <div className='container my-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-8 col-md-10'>
                    <TasksList />
                    <AddTask />
                </div>
            </div>
        </div>
    )
}
export default Dashboard;