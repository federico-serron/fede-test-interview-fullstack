import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { Context } from "../store/appContext";

const TasksList = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editLabel, setEditLabel] = useState("");

    const handleDelete = async (id) => {
        const resp = await actions.deleteTask(id);
        if (!resp) {
            toast.error(store.message);
        } else {
            toast.success("Task successfully deleted");
        }
    };

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditLabel(task.label);
    };

    const handleEditSave = async (id) => {
        if (editLabel.trim() == "") {
            toast.error("You must write a task")
            return;
        }

        const resp = await actions.updateTask(id, editLabel, undefined);
        if (!resp) {
            toast.error(store.message);
        } else {
            toast.success("Task updated");
            setEditingTaskId(null);
        }
    };

    const handleCheckboxChange = async (task) => {
        const newValue = !task.completed;
        const resp = await actions.updateTask(task.id, undefined, newValue);
        if (!resp) {
            toast.error(store.message);
        } else {
            toast.success("Task status updated");
        }
    };

    useEffect(() => {

        const fetchTasks = async () => {
            setLoading(true);
            const resp = await actions.getTasks();
            if (resp) setLoading(false);
            else setLoading(false);
        };

        fetchTasks();

    }, []);

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Label</th>
                    <th scope="col">Completed</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td className='text-center' colSpan={4}>Loading...</td>
                    </tr>
                ) : Array.isArray(store.tasks) && store.tasks.length > 0 ? (
                    store.tasks.map((task, index) => (
                        <tr key={task.id}>
                            <th scope="row">{index + 1}</th>

                            <td>
                                {editingTaskId === task.id ? (
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editLabel}
                                        onChange={(e) => setEditLabel(e.target.value)}
                                    />
                                ) : (
                                    task.label
                                )}
                            </td>

                            <td>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCheckboxChange(task)}
                                />
                            </td>

                            <td>
                                {editingTaskId === task.id ? (
                                    <button className="btn btn-sm btn-success me-2" onClick={() => handleEditSave(task.id)}>
                                        Save
                                    </button>
                                ) : (
                                    <i className="fas fa-edit text-primary me-3" role="button" onClick={() => handleEditClick(task)}></i>
                                )}
                                <i className="fas fa-trash-alt text-danger" role="button" onClick={() => handleDelete(task.id)}></i>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className='text-center' colSpan={4}>No tasks yet</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TasksList;
