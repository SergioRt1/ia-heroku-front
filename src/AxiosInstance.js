import axios from "axios";

let instance = null;
let callback = null;
let isLoggedIn = false;

export class AxiosInstance {

  static setCallback(func) {
    callback = func;
  }

  static getInstance() {
    const changeLoginState = isLoggedIn !== AxiosInstance.isLoginLocal()
    if (instance === null || changeLoginState) {
      const props = {
        timeout: 1000,
        baseURL: "https://server/api"
      }
      if (changeLoginState) {
        isLoggedIn = AxiosInstance.isLoginLocal()
        callback()
      }
      if (isLoggedIn) props.headers = {'Authorization': localStorage.getItem("username")}
      instance = axios.create(props);
    }

    return instance;
  }

  static isLoginLocal = () => localStorage.getItem("isLoggedIn") === 'true'


}
