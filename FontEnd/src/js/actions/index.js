//
// import { hashHistory } from 'react-router'
// export const requestAPI = "http://localhost:8080/"
//
//
//
//
//
//
// /*ReactDiyForm
// ------------------
// */
// let nextId = 0;
// export const clickLi = (type) => {
//     return {
//         type: type,
//     }
// }
// export const clickPreviewLi = (id) => {
//     return {
//         type: "CLICK",
//         id
//     }
// }
// export const oncopy = (id) => {
//     return {
//         type: "COPY",
//         id
//     }
// }
// export const ondelete = (id) => {
//     return {
//         type: "DELETE",
//         id
//     }
// }
// export const batchEdit = (data) => {
//     return {
//         type: "BATCHEDIT",
//         data
//     }
// }
// export const isNone = () => {
//     return {
//         type: "ISNONE",
//     }
// }
// export const submitDate = (value) => {
//     return {
//         type: "SUBMITDATE",
//         value
//     }
// }
// export const changeValue = (type, value, id, index, inputType) => {
//     switch (type) {
//         case "title":
//         return { type: "TITLE", title: value, id }
//         case "default":
//         return { type: "DEFAULT", default: value, id }
//         case "tis":
//         return { type: "TIS", tis: value, id }
//         case "manfen":
//         return { type: "MANFEN", manfen: value, id }
//         case "pingfenType":
//         return { type: "PINGFENTYPE", curren: value, id }
//         case "minValue":
//         return { type: "MINVALUE", minValue: value, id }
//         case "maxValue":
//         return { type: "MAXVALUE", maxValue: value, id }
//         case "required":
//         return { type: "REQUIRED", required: value, id }
//         case "readonly":
//         return { type: "READONLY", readonly: value, id }
//         case "choicesChecked":
//         return { type: "CHOICESCHECKED", choices: value, id, index, inputType }
//         case "choicesInput":
//         return { type: "CHOICESINPUT", choices: value, id, index }
//         case "addItem":
//         return { type: "ADDITEM", choices: value, id, index }
//         case "delItem":
//         return { type: "DELITEM", choices: value, id, index }
//     }
// }
