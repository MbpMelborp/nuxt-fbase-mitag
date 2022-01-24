import initialState from './state'

const cl = process.env.CONSOLE
export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState())
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.authUser = {
      uid: authUser.uid,
      email: authUser.email,
    }
  },
  SET_USER_DATA: (state, dataUser) => {
    if (cl) console.info('❕ | 📥  MUTATIONS SET_USER_DATA dataUser', dataUser)
    delete dataUser.password
    state.userData = { ...dataUser }
  },
}
