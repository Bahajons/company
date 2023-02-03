import { API } from "./API";
import axios from 'axios'
import Axios from "./Axios";

async function register(user) {

    return await Axios().post(`api/v1/account/register/`, { ...user })

}

async function verify(user) {
    return await Axios().post(`api/v1/account/accept-sms/`, { ...user })
}
async function login(user) {
    return await Axios().post(`api/v1/account/login/`, { ...user })
}
async function forgot(user) {
    return await Axios().post(`api/v1/account/forget-password/`, { ...user })
}
async function set_password(user) {
    // return await axios.post(`${API}api/v1/account/forget-password/`, { ...user })
    return await Axios().post(`api/v1/account/set-password/`, { ...user })
}

export { register, verify, login, forgot, set_password }