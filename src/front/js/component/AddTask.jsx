import React, { useEffect, useState, useContext } from 'react'
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Context } from "../store/appContext";

const AddTask = () => {

    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [label, setLabel] = useState("")

    const handleAddTask = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!label) {
            toast.error("You must add something to do")
            return
        }
        const resp = await actions.addTask(label)
        if (resp) {
            toast.success("Task added successfully!")
            setLoading(false)
            setLabel("")
            return
        }
        setLoading(false)
        setLabel("")
        toast.error(store.message)
    }

    return (
        <div>
            <form onSubmit={handleAddTask} >
                <div className="mb-3">
                    <input type="text" className="form-control" id="label" aria-describedby="label" required onChange={(e) => { setLabel(e.target.value) }} value={label} />
                    <div id="emailHelp" className="form-text">Add something to do</div>
                </div>

                <button type="submit" className={"btn btn-success"} disabled={loading}>{loading ? "Loading..." : "Add Task"}</button>

            </form>
        </div>
    )
}

export default AddTask;