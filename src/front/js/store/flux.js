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
					setStore({ ...store, message: "Todos los campos son obligatorios" })
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

					if (!response.ok) {
						throw new Error("Por favor intenta con un email diferente");
					}

					const data = await response.json()
					return true;

				} catch (error) {
					setStore({ ...store, message: error })
					return false;
				}
			},

			login: async (email, password) => {
				const URLlogin = `${apiUrl}/auth/login`;
				const store = getStore();

				if (!email || !password) {
					setStore({ ...store, message: "Email y Password son necesarios" })
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

					if (!response.ok) {
						throw new Error("Error al iniciar sesion");
					}

					const data = await response.json()

					if (!data.token) {
						throw new Error(data.error);
					}

					localStorage.setItem("token", data.token)
					setStore({ ...store, logged_user: data.user })

					return true;

				} catch (error) {
					setStore({ ...store, message: error })
					return false;
				}
			},

			logout: async () => {
				const URLlogout = `${apiUrl}/auth/login`;
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

					if (!response.ok) {
						throw new Error("Error trying to logout");
					}

					localStorage.removeItem("token")
					setStore({ ...store, logged_user: {} })

					return true;

				} catch (error) {
					setStore({ ...store, message: error })
					return false;
				}
			},



		}
	};
};

export default getState;
