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





// <svg
// xmlns="http://www.w3.org/2000/svg"
// xmlnsXlink="http://www.w3.org/1999/xlink"
// viewBox="0 0 13.76 13.76"
// height="13.76"
// width="13.76"
// version="1.1"
// >
// <image
//   x="0"
//   y="0"
//   xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAACXBIWXMAAC4jAAAuIwF4pT92AAABvklEQVRYw83Z23GDMBAF0AsNhBIowSVQgjuISnAJKSEdZNOBS6CDOBUkqSC4gs2PyGhAQg92se4M4w8bccYW2hVumBmRdAB6ADfopQcw2SOYNoIkAL8APgB8AzgLI0/2S/iy1xkt3B9m9h0dM9/YHxM4J/c4MfPkGX+y763OyYVKgUPQTXAJdC84Bg2CS6Gl4FSoF7wHmgvOhbrgzsW+8L4YJegccrEj749Rgs7ZXGdz8wbAeNbREcDTzrHvblEgBbAUFACuy6JALJeL0E/P9sbvmBnNojcgAM+oJ58AhrlnWM5ZA+C9RmiokakBvIJuNTLSc7hojqY0Mo8EB6Ep2CPBm9BU7BHgKDQHqwlOguZiNcDJ0JLe4FV4iaLYJjF16dLqnoob+EdDs8A1QJPBtUCTwDVBo+DaoJvgNvBIR6rDl9wirbA1QIPgVgl6VwHb+dAr7JkkS/Pg3mCkVOslxxV9yBFqSqTA/3N2Utkzye3pftw5OxzQ5tHeddcdzGj3o4VgClUwowgtAVOs3BpFaA6YUnsDowhNAVNu12UUoVtgCn2+ifxp1wO42Ner4KPR5dJ2tsse2ZLvTQxbVf4AmC2z7WnSvpIAAAAASUVORK5CYII="
//   preserveAspectRatio="none"
//   height="13.76"
//   width="13.76"
// />
// </svg>