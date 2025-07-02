const apiUrl = process.env.BACKEND_URL
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
					console.error("Missing required data")
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
						console.error("Error trying to sign you up, please try again later")
						throw new Error(response.statusText);

					}

					const data = await response.json()
					return true;

				} catch (error) {
					console.error("There was an error trying to sign you up:", error);
					return false;
				}
			},

		}
	};
};

export default getState;
