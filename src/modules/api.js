import jwt_decode from "jwt-decode";
import store from "./store";
import router from "./router";

// const API_BASE = "http://localhost:8888/agastyaapi/";
const API_BASE = "https://api.oswaldlabs.com/public-apis/agastya/";

const handleError = error => {
	if (error.code === "invalid_refresh_token") {
		store.dispatch("logoutUser");
		router.push("/login");
	}
};

const refreshToken = (force = 0) => {
	return new Promise((resolve, reject) => {
		const user = store.getters.getUser;
		if (user && user.token) {
			if (user.token.auth && user.token.refresh) {
				const decoded = jwt_decode(user.token.auth);
				if (force === 0 && parseInt(decoded.expires) * 1000 > new Date().getTime()) {
					resolve();
				} else {
					fetch(API_BASE + "auth/refresh", {
						cache: "no-cache",
						headers: {
							"content-type": "application/json"
						},
						method: "POST",
						body: JSON.stringify({
							token: user.token.refresh
						}),
						mode: "cors",
						redirect: "follow",
						referrer: "no-referrer"
					})
						.then(response =>
							response.json().then(json => {
								if (json.error) {
									handleError(json.error);
									reject();
								} else {
									store.dispatch("updateUser", json);
									console.log("refreshed token");
									resolve();
								}
							})
						)
						.catch(error => {
							handleError(error);
							reject();
						});
				}
			} else {
				resolve();
			}
		} else {
			resolve();
		}
	});
};

export const callApi = (endpoint, body, token, method) => {
	return new Promise((resolve, reject) => {
		refreshToken()
			.then(() => {
				const user = store.getters.getUser;
				if (!token && user && user.token) {
					if (user.token.auth && user.token.refresh) {
						token = user.token.auth;
					}
				}
				fetch(API_BASE + endpoint, {
					body: JSON.stringify(body),
					cache: "no-cache",
					headers: {
						"content-type": "application/json",
						Authorization: token ? "Bearer " + token : ""
					},
					method: method ? method : body ? "POST" : "GET",
					mode: "cors",
					redirect: "follow",
					referrer: "no-referrer"
				})
					.then(response =>
						response.json().then(json => {
							if (json.error) {
								reject(json.error);
							} else {
								if (json.refresh) {
									console.log("needs to refresh");
									refreshToken(1);
								}
								resolve(json);
							}
						})
					)
					.catch(error => reject(error));
			})
			.catch(error => console.log(error));
	});
};

export const analyticsList = (column, perPage = 10, currentPage = 1) => {
	const filterFrom = store.getters.getFrom;
	const filterTo = store.getters.getTo;
	const from = "2018-01-01";
	const to = "2018-04-03";
	const dataTitle = "analytics__list__" + column + perPage + currentPage + from + to + dataTitle;
	return new Promise((resolve, reject) => {
		if (sessionStorage[dataTitle]) {
			resolve(JSON.parse(sessionStorage.getItem(dataTitle)));
		} else {
			callApi("analytics/list", {
				column: column,
				perPage: perPage,
				currentPage: currentPage,
				from: from,
				to: to
			})
				.then(data => {
					sessionStorage.setItem(dataTitle, JSON.stringify(data));
					resolve(data);
				})
				.catch(error => {
					reject(error);
				});
		}
	});
};
