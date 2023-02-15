import axios from "axios";
import { API } from "./API";
import Axios from "./Axios";

// User
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
    return await Axios().post(`api/v1/account/set-password/`, { ...user })
}
async function get_profile() {
    return await Axios().get(`api/v1/account/profile/`)
}
async function update_profile(user) {
    return await Axios().put(`api/v1/account/profile/`, user)
}
export { register, verify, login, forgot, set_password, get_profile, update_profile }

// Competition
async function get_competition() {
    return await Axios().get(`api/v1/edu/competition`)
}
async function get_detail_competition(params) {
    return await Axios().get(`api/v1/edu/competition/${params}`)
}
async function patch_detail_competition(params, detail) {
    return await Axios().patch(`api/v1/edu/competition/${params}/`, detail)
}
async function delete_competition(params) {
    return await Axios().deleteItem(`api/v1/edu/competition/${params}/`)
}
async function add_competition(user) {
    return await Axios().post(`api/v1/edu/competition/`, user)
}
export {
    get_competition, add_competition, get_detail_competition,
    patch_detail_competition, delete_competition
}

// Questions

async function get_question_all(slug) {
    return await Axios().get(`api/v1/question/edu-questions/${slug}`)
}
async function get_question_detail(slug, num) {
    return await Axios().get(`api/v1/question/edu-questions/${slug}/${num}/`)
}
async function add_question(slug, question) {
    return await Axios().post(`api/v1/question/edu-questions/${slug}/`, question)
}
export { get_question_all, add_question, get_question_detail }

                // Answers
// async function get_question_all(slug) {
//     return await Axios().get(`api/v1/question/edu-questions/${slug}`)
// }
// async function add_question(slug, question) {
//     return await Axios().post(`api/v1/question/edu-questions/${slug}/`, question)
// }
// export { get_question_all, add_question }





