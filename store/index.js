export const state = () => ({
    message1: '',
    message2: '',
    count: 0
})

export const mutations = {
    increment(state) {
        state.count += 2
    },
    changMessage(state, message1_input1) {
        state.message1 = message1_input1
    },
    changeMessage2(state,message2_input2) {
        state.message1 = message2_input2
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