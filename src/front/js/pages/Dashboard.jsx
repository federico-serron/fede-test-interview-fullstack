import React from 'react'
import TasksList from '../component/TasksList.jsx';

const Dashboard = () => {
    return (
        <div className='container my-4'>
            <div className='row justify-content-center'>
                <div className='col-lg-8 col-md-10'>
                    <TasksList />
                </div>
            </div>
        </div>
    )
}
export default Dashboard;