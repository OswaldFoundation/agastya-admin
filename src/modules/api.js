export default function(url, body, token, method) {
	return new Promise((resolve, reject) => {
		fetch("http://localhost:8888/agastyaapi/" + url, {
			body: JSON.stringify(body),
			cache: "no-cache",
			headers: {
				"content-type": "application/json",
				Authorization: token ? "Bearer " + token : ""
			},
			method: method || body ? "POST" : "GET",
			mode: "cors",
			redirect: "follow",
			referrer: "no-referrer"
		})
			.then(response =>
				response.json().then(json => {
					if (json.error) {
						reject(json.error);
					} else {
						resolve(json);
					}
				})
			)
			.catch(error => reject(error));
	});
}
