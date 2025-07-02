const apiUrl = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			logged_user: {},
			tasks: [],
		},

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(apiUrl + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			register: async (username, email, password) => {
				const URLregister = `${apiUrl}/auth/register`;
				const store = getStore();

				if (!username || !email || !password) {
					setStore({ ...store, message: "All fields are required" })
					return false
				}

				try {

					const userData = {
						username: username,
						email: email,
						password: password
					}

					const response = await fetch(URLregister, {
						method: "POST",
						body: JSON.stringify(userData),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})

					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}

					setStore({ ...store, message: "Welcome aboard!" })
					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},

			login: async (email, password) => {
				const URLlogin = `${apiUrl}/auth/login`;
				const store = getStore();

				if (!email || !password) {
					setStore({ ...store, message: "All fields are required" })
					return false
				}

				try {

					const userData = {
						email: email,
						password: password
					}

					const response = await fetch(URLlogin, {
						method: "POST",
						body: JSON.stringify(userData),
						headers: {
							"Content-type": "application/json; charset=UTF-8"
						}
					})
					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}

					if (!data.token) {
						throw new Error(data.error);
					}

					localStorage.setItem("token", data.token)
					setStore({ ...store, logged_user: data.user })

					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},

			logout: async () => {
				const URLlogout = `${apiUrl}/auth/logout`;
				const store = getStore();
				const token = localStorage.getItem("token")

				if (!token) {
					setStore({ ...store, message: "You have to login first to be able to logout" })
					return false
				}

				try {

					const response = await fetch(URLlogout, {
						method: "POST",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem('token')}`,
							"Content-type": "application/json; charset=UTF-8"
						}
					})

					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}

					localStorage.removeItem("token")
					setStore({ ...store, logged_user: {} })

					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},

			addTask: async (label) => {
				const URLtask = `${apiUrl}/tasks`;
				const store = getStore();

				if (!label) {
					setStore({ ...store, message: "A label is required" })
					return false
				}

				try {

					const taskData = { label: label }

					const response = await fetch(URLtask, {
						method: "POST",
						body: JSON.stringify(taskData),
						headers: {
							"Authorization": `Bearer ${localStorage.getItem('token')}`,
							"Content-type": "application/json; charset=UTF-8"
						}
					})
					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}


					setStore({ ...store, tasks: [...store.tasks, data.task] })

					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},

			getTasks: async () => {
				const URLtask = `${apiUrl}/tasks`;
				const store = getStore();

				try {

					const response = await fetch(URLtask, {
						method: "GET",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem('token')}`,
							"Content-type": "application/json; charset=UTF-8"
						}
					})
					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}

					setStore({ ...store, tasks: data.task })

					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},

			updateTask: async (task_id, label, completed) => {
				const URLtask = `${apiUrl}/tasks/${task_id}`;
				const store = getStore();

				if (!task_id && !label || !completed) {
					setStore({ ...store, message: "Missing data" })
					return false
				}

				try {

					const editTaskData = {}
					if (label !== undefined) editTaskData.label = label;
					if (completed !== undefined) editTaskData.completed = completed;

					const response = await fetch(URLtask, {
						method: "PUT",
						body: JSON.stringify(editTaskData),
						headers: {
							"Authorization": `Bearer ${localStorage.getItem('token')}`,
							"Content-type": "application/json; charset=UTF-8"
						}
					})

					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}

					setStore({
						...store, tasks: store.tasks.map((t) => {
							t.id === task_id ? data.task : t
						})
					})

					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},

			deleteTask: async (task_id) => {
				const URLtask = `${apiUrl}/tasks/${task_id}`;
				const store = getStore();

				if (!task_id) {
					setStore({ ...store, message: "Please select the task to delete" })
					return false
				}

				try {

					const response = await fetch(URLtask, {
						method: "DELETE",
						headers: {
							"Authorization": `Bearer ${localStorage.getItem('token')}`,
							"Content-type": "application/json; charset=UTF-8"
						}
					})

					const data = await response.json()

					if (!response.ok) {
						throw new Error(data.error);
					}

					setStore({
						...store, tasks: store.tasks.filter((t) => {
							t.id !== task_id
						})
					})

					return true;

				} catch (error) {
					setStore({ ...store, message: error.message })
					return false;
				}
			},


		}
	};
};

export default getState;
