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

export const wikipediaIntro = q => {
	const better = text => {
		text = text.replace(/ *\([^)]*\) */g, "");
		if (text.length > 300) {
			text = text.substring(0, 300) + "...";
			console.log(text.split(". ").length);
			if (text.split(". ").length > 2) {
				return (text = text.split(". ")[0] + ". " + text.split(". ")[1] + "." || text.split(". ")[0] + ". ");
			} else if (text.split(". ").length === 2) {
				text = text.split(". ")[0] + ". ";
			}
		}
		return text;
	};
	const dataTitle = "wikipedia__q" + encodeURIComponent(q);
	return new Promise((resolve, reject) => {
		if ("sessionStorage" in window && window.sessionStorage[dataTitle]) {
			resolve(better(window.sessionStorage.getItem(dataTitle)));
		} else {
			fetch(
				"https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles=" + q
			)
				.then(response => response.json())
				.then(data => {
					if (data.query && data.query.pages) {
						const text = Object.values(data.query.pages)[0].extract;
						if (text) {
							if ("sessionStorage" in window) {
								window.sessionStorage.setItem(dataTitle, text);
							}
							resolve(better(text));
						} else {
							reject();
						}
					} else {
						reject();
					}
				})
				.catch(error => {
					reject(error);
				});
		}
	});
};

export const analyticsList = (column, perPage = 10, currentPage = 1) => {
	const filterFrom = new Date(store.getters.getFrom);
	const filterTo = new Date(store.getters.getTo);
	const from = filterFrom.getFullYear() + "-" + filterFrom.getMonth() + "-" + filterFrom.getDate();
	const to = filterTo.getFullYear() + "-" + filterTo.getMonth() + "-" + filterTo.getDate();
	const dataTitle = "analytics__list__" + column + perPage + currentPage + from + to + dataTitle;
	return new Promise((resolve, reject) => {
		if ("sessionStorage" in window && window.sessionStorage[dataTitle]) {
			resolve(JSON.parse(window.sessionStorage.getItem(dataTitle)));
		} else {
			callApi("analytics/list", {
				column: column,
				perPage: perPage,
				currentPage: currentPage,
				from: from,
				to: to
			})
				.then(data => {
					if ("sessionStorage" in window) {
						window.sessionStorage.setItem(dataTitle, JSON.stringify(data));
					}
					resolve(data);
				})
				.catch(error => {
					reject(error);
				});
		}
	});
};
