import store from "./store";
import router from "./router";

export default error =>
  new Promise((resolve, reject) => {
    if (error && error.response) {
      if (error.response.status === 401) {
        store.commit("logout");
        setTimeout(() => {
          router.replace("/");
        }, 10);
      }
    }
    reject(error);
  });
