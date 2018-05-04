import auth0 from "auth0-js";
import EventEmitter from "eventemitter3";
import router from "./router";

const authService = new auth0.WebAuth({
	domain: "a11y.eu.auth0.com",
	clientID: "Gku3KqOoHI7ORDWMG66HLpAGWQ9TVDDi",
	redirectUri: "http://localhost:4000/callback",
	audience: "https://a11y.eu.auth0.com/userinfo",
	responseType: "token id_token",
	scope: "openid profile email"
});

export default {
	login: () => {
		authService.authorize();
	}
};
