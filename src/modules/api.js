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
					store.dispatch("logoutUser");
					router.push("/login");
				}
			} else {
				resolve();
			}
		} else {
			resolve();
		}
	});
};

const previousCalls = {};
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
				if (
					previousCalls[endpoint + JSON.stringify(body)] &&
					new Date() - previousCalls[endpoint + JSON.stringify(body)] < 1000
				) {
					reject();
					return;
				} else {
					previousCalls[endpoint + JSON.stringify(body)] = new Date();
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
		if (text.indexOf("refers to") > -1) {
			return false;
		}
		if (text.indexOf("refer to") > -1) {
			return false;
		}
		text = text.replace(/ *\([^)]*\) */g, " ");
		text = text.replace(/[\])}[{(]/g, " ");
		text = text.replace(/[ \t]+,/g, ",");
		text = text.replace(/[ \t]+\./g, ".");
		if (text.length > 300) {
			text = text.substring(0, 300) + "...";
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
			if (better(window.sessionStorage.getItem(dataTitle))) {
				resolve(better(window.sessionStorage.getItem(dataTitle)));
			} else {
				reject();
			}
		} else {
			fetch(
				"https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro=&explaintext=&titles=" + q
			)
				.then(response => response.json())
				.then(data => {
					if (data.query && data.query.pages) {
						const text = Object.values(data.query.pages)[0].extract;
						if (better(text)) {
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

const makeDate = d => {
	let year = d.getUTCFullYear();
	let month = d.getUTCMonth();
	month = month < 10 ? "0" + month : month;
	let day = d.getUTCDate();
	day = day < 10 ? "0" + day : day;
	return year + "-" + month + "-" + day;
}

export const list = (columnName, page) => {
	return new Promise((resolve, reject) => {
		const user = store.getters.getUser;
		let fromBefore = new Date(store.getters.getFrom); const fromDate = makeDate(fromBefore);
		let toBefore = new Date(store.getters.getTo); const toDate = makeDate(toBefore);
		if (localStorage.getItem(`apiCache_${columnName}_${fromDate}_${toDate}_${page}`)) {
			resolve(JSON.parse(localStorage.getItem(`apiCache_${columnName}_${fromDate}_${toDate}_${page}`)));
		} else {
			fetch(
				`https://api.oswaldlabs.com/public-apis/agastya/v2/list.php?access_key=0abec53b0149ca61e2e62599ad1d54ef&api_key=5rlsghx&from_date=${fromDate}&to_date=${toDate}&column=${columnName}&n_limit=10&page=${page}`
			)
				.then(response => response.json())
				.then(json => {
					localStorage.setItem(`apiCache_${columnName}_${fromDate}_${toDate}_${page}`, JSON.stringify(json));
					resolve(json);
				});
		}
	});
};

export const sessions = (columnName, columnValue, page) => {
	return new Promise((resolve, reject) => {
		const user = store.getters.getUser;
		let fromBefore = new Date(store.getters.getFrom); const fromDate = makeDate(fromBefore);
		let toBefore = new Date(store.getters.getTo); const toDate = makeDate(toBefore);
		if (localStorage.getItem(`apiCache_${columnName}_${columnValue}_${fromDate}_${toDate}_${page}`)) {
			resolve(JSON.parse(localStorage.getItem(`apiCache_${columnName}_${columnValue}_${fromDate}_${toDate}_${page}`)));
		} else {
			fetch(
				`https://api.oswaldlabs.com/public-apis/agastya/v2/sessions.php?access_key=0abec53b0149ca61e2e62599ad1d54ef&api_key=5rlsghx&from_date=${fromDate}&to_date=${toDate}&column=${columnName}&val=${columnValue}&n_limit=10&page=${page}`
			)
				.then(response => response.json())
				.then(json => {
					localStorage.setItem(`apiCache_${columnName}_${columnValue}_${fromDate}_${toDate}_${page}`, JSON.stringify(json));
					resolve(json);
				});
		}
	});
};

export const events = (columnValue, page) => {
	return new Promise((resolve, reject) => {
		const user = store.getters.getUser;
		let fromBefore = new Date(store.getters.getFrom); const fromDate = makeDate(fromBefore);
		let toBefore = new Date(store.getters.getTo); const toDate = makeDate(toBefore);
		if (localStorage.getItem(`apiCache_session_${columnValue}_${fromDate}_${toDate}_${page}`)) {
			resolve(JSON.parse(localStorage.getItem(`apiCache_session_${columnValue}_${fromDate}_${toDate}_${page}`)));
		} else {
			fetch(
				`https://api.oswaldlabs.com/public-apis/agastya/v2/events.php?access_key=0abec53b0149ca61e2e62599ad1d54ef&api_key=5rlsghx&from_date=${fromDate}&to_date=${toDate}&val=${columnValue}&n_limit=10&page=${page}`
			)
				.then(response => response.json())
				.then(json => {
					localStorage.setItem(`apiCache_session_${columnValue}_${fromDate}_${toDate}_${page}`, JSON.stringify(json));
					resolve(json);
				});
		}
	});
};
