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

//Promocode
async function get_promocode(slug) {
    return await Axios().get(`api/v1/edu/promo-code/${slug}/`)
}
async function post_promocode(slug, promocode) {
    return await Axios().post(`api/v1/edu/promo-code/${slug}/`, promocode)
}
async function patch_promocode(slug, id, promocode) {
    return await Axios().patch(`api/v1/edu/promo-code/${slug}/${id}/`, promocode)
}
async function delete_promocode(slug, id) {
    return await Axios().deleteItem(`api/v1/edu/promo-code/${slug}/${id}/`)
}

export { get_promocode, post_promocode, patch_promocode, delete_promocode }


// Questions

async function get_question_all(slug) {
    return await Axios().get(`api/v1/question/edu-questions/${slug}`)
}
async function get_question_detail(slug, id) {
    return await Axios().get(`api/v1/question/edu-questions/${slug}/${id}/`)
}
async function add_question(slug, question) {
    return await Axios().post(`api/v1/question/edu-questions/${slug}/`, question)
}
async function patch_question(slug, id, question) {
    return await Axios().patch(`api/v1/question/edu-questions/${slug}/${id}/`, question)
}
async function delete_question(slug, id) {
    return await Axios().deleteItem(`api/v1/question/edu-questions/${slug}/${id}/`)
}
export { get_question_all, add_question, get_question_detail, patch_question, delete_question }

// Answers
async function get_answer_all(slug) {
    return await Axios().get(`api/v1/question/edu-answers/${slug}/`)
}
async function get_answer_detail(slug, id) {
    return await Axios().get(`api/v1/question/edu-answers/${slug}/${id}/`)
}
async function add_answer(slug, id, answer) {
    return await Axios().post(`api/v1/question/edu-answers/${slug}/${id}/`, answer)
}
async function update_answer(slug, id_question, id_answer, answer) {
    return await Axios().patch(`api/v1/question/edu-answers/${slug}/${id_question}/${id_answer}/`, answer)
}
async function delete_answer(slug, id, id_answer) {
    return await Axios().deleteItem(`api/v1/question/edu-answers/${slug}/${id}/${id_answer}`)
}
export { add_answer, get_answer_all, get_answer_detail, update_answer, delete_answer }

// participants 
async function get_connect_comp() {
    return await Axios().get(`api/v1/participation/connect-competition/`)
}
export { get_connect_comp }
