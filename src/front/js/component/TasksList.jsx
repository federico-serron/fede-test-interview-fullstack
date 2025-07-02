import React, { useEffect, useState, useContext } from 'react'
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Context } from "../store/appContext";

const TasksList = () => {

    const { store, actions } = useContext(Context);

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Label</th>
                    <th scope="col">Completed</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                </tr>
            </tbody>
        </table>
    )
}

export default TasksList;