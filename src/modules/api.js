export default function(method, url, body, toke) {
	fetch(process.env.API_BASE + url, {
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
}
