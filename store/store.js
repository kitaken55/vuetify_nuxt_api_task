import Vuex from "vuex"

// export default new Vuex.Store({
//     state: {
//         token: "",
//         id: "",
//         name: "",
//         bio: ""
//     },
//     mutations: {
//         changeLocalStorage(state, payload) {
//             state.token = payload.token;
//             state.id = payload.id;
//             state.name = payload.name;
//             state.bio = payload.bio;
//         },
//         editLocalStorage(state, payload) {
//             state.name = payload.name;
//             state.bio = payload.bio;
//         }
//     },
//     getters: {
//         getToken: state => state.token,
//         getId: state => state.id,
//         getName: state => state.name,
//         getBio: state => state.bio
//     }
// })

export const state = () => ({
    token: "",
    id: "",
    name: "",
    bio: "",
})

export const mutations = {
    changeLocalStorage(state, payload) {
        state.token = payload.token;
        state.id = payload.id;
        state.name = payload.name;
        state.bio = payload.bio;
    },
    editLocalStorage(state, payload) {
        state.name = payload.name;
        state.bio = payload.bio;
    }
}

export const getters = {
    getToken: state => state.token,
    getId: state => state.id,
    getName() {
        return this.state.name
    },
    getBio: state => state.bio
}


// export const getters = {
//     getUsers(state) {
//         return state.users
//     },
// }

// export const mutations = {
//     addUser(state, paylaod) {
//         state.users.push(paylaod.user)
//     },
//     updateUser(state, paylaod) {
//         state.users.forEach((user, index) => {
//             if (user.id === paylaod.user.id) {
//                 state.users.splice(index, 1, paylaod.user)
//             }
//         })
//     },
//     removeUser(state, paylaod) {
//         state.users.forEach((user, index) => {
//             if (user.id === paylaod.user.id) {
//                 state.users.splice(index, 1)
//             }
//         })
//     }
// }