export const state = () => ({
    token: "",
    id: "",
    name: "",
    bio: "",
})

export const mutations = {
    increment(state) {
        state.count += 2
    },
    changeLocalStorage(state, token, id, name, bio) {
        state.token = token;
        state.id = id;
        state.name = name;
        state.bio = bio;
    }
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